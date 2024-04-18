import express from 'express';
import  dotenv from "dotenv";
import cors from 'cors';
import connectDB from './db/index.js';
import userRoutes from './routes/user.routes.js'
import productRoutes from './routes/product.routes.js';
dotenv.config();


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


//define routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);

//health route
app.get("/", (req,res)=>{
    res.json({msg:"Hello world"})
})
app.listen(process.env.PORT || 5000, ()=>{
    console.log(`baby running on port ${process.env.PORT}`)
})