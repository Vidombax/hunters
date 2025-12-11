import express from 'express'
import dotenv from 'dotenv'
dotenv.config();

import userRouter from './routes/user/route.js'
import threadRouter from './routes/thread/route'

const app = express();

app.use(express.json());

app.use('/', userRouter);
app.use('/', threadRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
});
