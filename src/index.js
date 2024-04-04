import express from 'express';
import dotenv from 'dotenv';
dotenv.config()


const app=express();

//health route
app.get("/", (req,res)=>{
    res.json({msg:"Hello world"})
})
app.listen(process.env.PORT || 5000, ()=>{
    console.log(`baby running on port ${process.env.PORT}`)
})