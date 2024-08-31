import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import env from 'dotenv';
import chalk from 'chalk';
import userRouter from './routers/user.router.js';
import adminRouter from './routers/admin.router.js';
import categoryRouter from './routers/category.router.js';
import commonRouter from './routers/com.router.js';
import homeRouter from './routers/home.router.js';


env.config();
const app = express();
const corsAllow = {
    origin: "http://localhost:5173",
    methods: "POST, GET, PUT, PATCH, DELETE, HEAD",
    credentials: true
}
const dbConnection = ()=>{
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log(chalk.green.inverse("DB connected successfully."));
    }).catch((e)=>{
        console.log(chalk.red.inverse(e));
    })
}

app.use(express.json());
app.use(cors(corsAllow));
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/category', categoryRouter);
app.use('/api/common', commonRouter);
app.use('/api/home', homeRouter);

app.listen(process.env.PORT, (err)=>{
    if(!err){
        console.log(chalk.yellow.inverse(`Server is live at port ${process.env.PORT}`))
        dbConnection();
    }
});