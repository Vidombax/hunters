import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import db from '../../db.js'
import logger from '../../logger.js'
import {getDate, getMonth, getYear, parseISO} from "date-fns";

class UserHandler {
    async createUser(req, res) {
        const funcName = 'createUser';

        const { name, password } = req.body;

        const client = await db.connect();

        try {
            await client.query('BEGIN');

            const getUser = await client.query(
                'SELECT name FROM users ' +
                'WHERE name = $1',
                [name]
            );

            if (getUser.rows.length === 0) {
                const hashedPassword = await bcrypt.hash(password, 10);

                //Создаем новый аккаунт
                const createUser = await client.query(
                    'INSERT INTO users (name, password, is_admin) ' +
                    'VALUES ($1, $2, false)' +
                    'RETURNING *',
                    [name.trim(), hashedPassword]
                );

                const token = jwt.sign(
                    { name: name },
                    process.env.SECRET_KEY,
                    { expiresIn: '168h' }
                );

                res.status(201).json({ token, message: 'Пользователь был зарегистрирован', id: createUser.rows[0].id_user });
            }
            else {
                res.status(409).json({ message: 'На этот логин уже существует аккаунт' });
            }
            await client.query('COMMIT');
        }
        catch (e) {
            await client.query('ROLLBACK');
            logger.error(`${funcName}: Ошибка создания пользователя:`, e);
            res.status(500).json({ message: 'Ошибка создания пользователя' });
        }
        finally {
            client.release();
        }
    }
    async loginUser(req, res) {
        const funcName = 'loginUser';

        const { name, password } = req.body;

        const client = await db.connect();
        try {
            await client.query('BEGIN');

            //Ищем пользователя
            const getUser = await client.query(
                'SELECT * from users ' +
                'WHERE name = $1',
                [name]
            );

            if (getUser.rows.length !== 0) {
                const isValidPassword = await bcrypt.compare(password, getUser.rows[0].password)
                if (isValidPassword) {
                    const token = jwt.sign(
                        { name: name },
                        process.env.SECRET_KEY,
                        { expiresIn: '168h' }
                    );

                    res.json({ token, message: 'Пользователь был найден', id: getUser.rows[0].id_user });
                }
                else {
                    res.status(403).json({ message: 'Неправильный пароль' });
                }
            }
            else {
                res.status(404).json({ message: 'Пользователя с данным логиным не найдено' });
            }

            await client.query('COMMIT');
        }
        catch (e) {
            await client.query('ROLLBACK');
            logger.error(`${funcName}: Ошибка авторизации пользователя:`, e);
            res.status(500).json({ message: 'Ошибка на стороне сервера' });
        }
        finally {
            client.release();
        }
    }
    async getUser(req, res) {
        const funcName = 'getUser';

        const { id } = req.params;
        const client = await db.connect();

        try {
            await client.query('BEGIN');

            const getUser = await client.query(
                'SELECT name, is_admin FROM users ' +
                'WHERE id_user = $1',
                [id]
            );

            if (getUser.rows.length > 0) {
                res.status(200).json({ message: 'Пользователь найден' });
            }
            else {
                res.status(404).json({ message: 'Пользователь не найден' });
            }

            await client.query('COMMIT');
        }
        catch (e) {
            await client.query('ROLLBACK');
            logger.error(`${funcName}: Ошибка по получению данных пользователя:`, e);
            res.status(500).json({ message: 'Ошибка на стороне сервера' });
        }
        finally {
            client.release();
        }
    }
    async createComment(req, res) {
        const funcName = 'createComment';

        const { id_thread, id_user, comment } = req.body;

        const client = await db.connect();

        try {
            await client.query('BEGIN');

            const createComment = await client.query(
                'INSERT INTO comments (id_thread, id_user, text, date_publish) ' +
                'VALUES ($1, $2, $3, CURRENT_DATE) ' +
                'RETURNING *',
                [id_thread, id_user, comment.trim()]
            );

            createComment.rows[0].comment_score = 0;

            let date = createComment.rows[0].date_publish;
            createComment.rows[0].date_publish = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

            res.status(200).json({ message: 'Комментарий создан', comment: createComment.rows[0] });

            await client.query('COMMIT');
        }
        catch (e) {
            await client.query('ROLLBACK');
            logger.error(`${funcName}: Ошибка создания комментария:`, e);
            res.status(500).json({ message: 'Ошибка на стороне сервера' });
        }
        finally {
            client.release();
        }
    }
    async rateTread(req, res) {
        const funcName = 'rateTread';

        const { id_tread, id_user, score } = req.body;

        const client = await db.connect();

        try {
            await client.query('BEGIN');

            const getRate = await client.query(
                'SELECT * FROM thread_scores ' +
                'WHERE id_user = $1 AND id_thread = $2',
                [id_user, id_tread]
            );

            if (getRate.rows.length > 0) {
                if (getRate.rows[0].score !== score) {
                    const updateRate = await client.query(
                        'UPDATE thread_scores SET score = $1 ' +
                        'WHERE id_user = $2 AND id_thread = $3',
                        [score, id_user, id_tread]
                    );
                    res.status(200).json({ message: 'Оценка обновлена' });
                }
                else {
                    logger.info(`${funcName}: Оценка такая же не обновляем`);
                    res.status(200).json({ message: 'Оценка обновлена' });
                }
            }
            else {
                const createRate = await client.query(
                    'INSERT INTO thread_scores (id_thread, id_user, score) ' +
                    'VALUES ($1, $2, $3)',
                    [id_tread, id_user, score]
                );
                res.status(200).json({ message: 'Оцена создана' });
            }

            await client.query('COMMIT');
        }
        catch (e) {
            await client.query('ROLLBACK');
            logger.error(`${funcName}: Ошибка оценки комментария:`, e);
            res.status(500).json({ message: 'Ошибка на стороне сервера' });
        }
        finally {
            client.release();
        }
    }
    async rateComment(req, res) {
        const funcName = 'rateComment';

        const { id_comment, id_user, score } = req.body;

        const client = await db.connect();

        try {
            await client.query('BEGIN');

            const getRate = await client.query(
                'SELECT * FROM comment_scores ' +
                'WHERE id_user = $1 AND id_comment = $2',
                [id_user, id_comment]
            );

            if (getRate.rows.length > 0) {
                if (getRate.rows[0].score !== score) {
                    const updateRate = await client.query(
                        'UPDATE comment_scores SET score = $1 ' +
                        'WHERE id_user = $2 AND id_comment = $3',
                        [score, id_user, id_comment]
                    );
                    res.status(200).json({ message: 'Оценка обновлена' });
                }
                else {
                    logger.info(`${funcName}: Оценка такая же не обновляем`);
                    res.status(200).json({ message: 'Оценка обновлена' });
                }
            }
            else {
                const createRate = await client.query(
                    'INSERT INTO comment_scores (id_comment, id_user, score) ' +
                    'VALUES ($1, $2, $3)',
                    [id_comment, id_user, score]
                );
                res.status(200).json({ message: 'Оцена создана' });
            }

            await client.query('COMMIT');
        }
        catch (e) {
            await client.query('ROLLBACK');
            logger.error(`${funcName}: Ошибка оценки комментария:`, e);
            res.status(500).json({ message: 'Ошибка на стороне сервера' });
        }
        finally {
            client.release();
        }
    }
}

export default new UserHandler()
