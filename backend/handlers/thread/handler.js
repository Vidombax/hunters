import {getDate, getMonth, getYear, parseISO} from 'date-fns'

import db from '../../db.js'
import logger from '../../logger.js'

class ThreadHandler {
    async createThread(req, res) {
        const funcName = 'createThread';
        const { id_user, header, description, tags } = req.body;

        const client = await db.connect();

        try {
            await client.query('BEGIN');

            const thread = await client.query(
                'INSERT INTO threads (header, description, date_publish, id_user, is_active, tags) ' +
                'VALUES ($1, $2, $3, CURRENT_DATE, $4, false, $5) ' +
                'RETURNING *',
                [header.trim(), description.trim(), id_user, tags]
            );

            await client.query('COMMIT');

            res.status(200).json({ message: 'Тред был создан' });
        }
        catch (e) {
            await client.query('ROLLBACK');
            logger.error(`${funcName}: Ошибка создания треда:`, e);
            res.status(500).json({ message: 'Ошибка на стороне сервера' });
        }
        finally {
            client.release();
        }
    }
    async setVisibilityThread(req, res) {
        const funcName = 'setVisibilityThread';

        const { id } = req.params;

        const client = await db.connect();

        try {
            await client.query('BEGIN');

            const getThread = await client.query(
                `SELECT is_active FROM threads 
                 WHERE id_thread = $1`,
                [id]
            );

            if (getThread.rows.length > 0) {
                if (getThread.rows[0].is_active === true) {
                    const hideThread = await client.query(`UPDATE threads SET is_active = false WHERE id_thread = $1`, [id]);
                }
                else {
                    const showThread = await client.query(`UPDATE threads SET is_active = true WHERE id_thread = $1`, [id]);
                }
            }
            else {
                res.status(404).json({ message: 'Не нашли тред по заданному ID' });
                logger.error(`${funcName}: Не нашли тред по ID ${id}`);
            }

            await client.query('COMMIT');
        }
        catch (e) {
            await client.query('ROLLBACK');
            logger.error(`${funcName}: Ошибка изменения видимости треда:`, e);
            res.status(500).json({ message: 'Ошибка на стороне сервера' });
        }
        finally {
            client.release();
        }
    }
    async getThread(req, res) {
        const funcName = 'getThread';

        const { id } = req.params;
        let data = {
            thread: [],
            comments: [],
            score: 0
        };

        const client = await db.connect();

        try {
            await client.query('BEGIN');

            const { rows } = await client.query(
                `SELECT id_thread, header, description, date_publish::text as date_publish, u.id_user, is_active, tags, u.name FROM threads INNER JOIN public.users u on u.id_user = threads.id_user
                 WHERE id_thread = $1`,
                [id]
            );

            if (rows.length > 0) {
                let date = parseISO(rows[0].date_publish);
                rows[0].date_publish = `${getDate(date)}.${getMonth(date)}.${getYear(date)}`;

                data.thread = rows[0];

                logger.info(`${funcName}: Получаем оценку по треду ${id}`);
                const getScoreByThread = await client.query(
                    `SELECT SUM(score)::integer AS thread_score FROM thread_scores 
                                  WHERE id_score = $1`,
                    [id]
                );

                if (getScoreByThread.rows.length > 1) {
                    data.score = getScoreByThread.rows[0].thread_score;
                }

                logger.info(`${funcName}: Получаем комментарии по треду ${id}`);
                const getCommentsByThread = await client.query(
                    `SELECT id_user, text, date_publish FROM comments 
                                   WHERE id_thread = $1`,
                    [id]
                );

                if (getCommentsByThread.rows.length > 0) {
                    data.comments = getCommentsByThread.rows;
                }

                res.status(200).json({ message: 'Нашли тред', data });
            }
            else {
                res.status(200).json({ message: `Не нашли тред по заданному ID ${id}` });
            }

            await client.query('COMMIT');

        }
        catch (e) {
            await client.query('ROLLBACK');
            logger.error(`${funcName}: Ошибка вывода треда:`, e);
            res.status(500).json({ message: 'Ошибка на стороне сервера' });
        }
        finally {
            client.release();
        }
    }
    async getThreads(req, res) {
        const funcName = 'getThreads';
    
        const client = await db.connect();
    
        try {
            await client.query('BEGIN');

            const { rows } = await client.query(
                `SELECT id_thread, header, description, date_publish::text as date_publish, u.id_user, is_active, tags, u.name
                 FROM threads
                          INNER JOIN public.users u on u.id_user = threads.id_user
                 `
            );

            if (rows.length > 0) {
                for (const item of rows) {
                    const getScoreByThread = await client.query(
                        `SELECT SUM(score)::integer AS thread_score FROM thread_scores 
                                  WHERE id_thread = $1`,
                        [item.id_thread]
                    );

                    if (getScoreByThread.rows[0].thread_score > 0) {
                        item.score = getScoreByThread.rows[0].thread_score;
                    }
                    else {
                        item.score = 0;
                    }

                    let date = parseISO(item.date_publish);
                    item.date_publish = `${getDate(date)}.${getMonth(date)}.${getYear(date)}`;
                }

                res.status(200).json({ message: 'Получили треды', threads: rows });
            }
    
            await client.query('COMMIT');
        }
        catch (e) {
            await client.query('ROLLBACK');
            logger.error(`${funcName}: Ошибка получения тредов:`, e);
            res.status(500).json({ message: 'Ошибка на стороне сервера' });
        }
        finally {
            client.release();
        }
    }
    async updateThread(req, res) {
        const funcName = 'updateThread';

        const dataThread = req.body;

        const client = await db.connect();

        try {
            await client.query('BEGIN');

            const getThread = await client.query(
                'SELECT * FROM threads ' +
                'WHERE id_thread = $1',
                [dataThread.id]
            );

            if (getThread.rows.length > 0) {
                let needChangeInfo = {};

                for (const key in getThread.rows[0]) {
                    //Если есть разница между данными полученными и из базы
                    if (dataThread[key] !== undefined && dataThread[key] !== getThread.rows[0][key]) {
                        needChangeInfo[key] = dataThread[key];
                    }
                }

                if (Object.keys(needChangeInfo).length > 0) {
                    logger.info(`${funcName}: Данные которые нужно обновить`, needChangeInfo);

                    const setClause = Object.keys(needChangeInfo)
                        .map((key, index) => `${key} = $${index + 2}`)
                        .join(', ');

                    const query = `
                        UPDATE threads
                        SET ${setClause}
                        WHERE id_thread = $1
                    `;

                    const values = [dataThread.id, ...Object.values(needChangeInfo)];

                    await client.query(query, values);

                    res.status(200).json({ message: 'Данные обновлены' });
                }
                else {
                    logger.info(`${funcName}: Данные треда ${dataThread.id} такие же не обновляем`);
                    res.status(200).json({ message: 'Данные обновлены' });
                }
            }
            else {
                res.status(404).json({ message: `Не нашли тред под ID ${dataThread.id}` });
            }

            await client.query('COMMIT');
        }
        catch (e) {
            await client.query('ROLLBACK');
            logger.error(`${funcName}: Ошибка обновления поста:`, e);
            res.status(500).json({ message: 'Ошибка на стороне сервера' });
        }
        finally {
            client.release();
        }
    }
}

export default new ThreadHandler();
