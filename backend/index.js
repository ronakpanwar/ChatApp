import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/connectDB.js";
dotenv.config({});

const app = express();

const PORT =process.env.PORT || 5000;

app.listen(PORT , ()=>{
    connectDB();
    console.log(`Server start on port ${PORT}`)
})