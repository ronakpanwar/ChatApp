import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/connectDB.js";
import userRouter from './routes/userRoute.js'
import messageRouter from "./routes/messageRoute.js"
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config({});

const app = express();
app.use(express.json());
app.use(cookieParser());
const  corsOptions  = {
    origin:"http://localhost:3000",
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials:true
}
app.use(cors(corsOptions));
const PORT =process.env.PORT || 5000;


app.use('/api/user', userRouter)
app.use('/api/message' , messageRouter)


app.listen(PORT , ()=>{
    connectDB();
    console.log(`Server start on port ${PORT}`)
})