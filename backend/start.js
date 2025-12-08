import express from 'express'
import dotenv from 'dotenv'
dotenv.config();

import userMainRouter from './routes/user/route.js'

const app = express();

app.use(express.json());

app.use('/', userMainRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
});
