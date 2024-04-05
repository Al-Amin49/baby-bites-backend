import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/index.js';
dotenv.config()


const app=express();

//middlewares
app.use(
    cors({
        origin:process.env.CORS_ORIGIN,
        credentials:true
    })
);
app.use(express.json());

//config db

connectDB();

//health route
app.get("/", (req,res)=>{
    res.json({msg:"Hello world"})
})
app.listen(process.env.PORT || 5000, ()=>{
    console.log(`baby running on port ${process.env.PORT}`)
})