import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRouter from "./Routes/authRoutes.js";
import restoRouter from "./Routes/restaurantsRoutes.js";
import authenticateJWT from "./middlewares/AuthenticateJWT.js";
import checkRedisClient from "./middlewares/checkRedisClient.js";
const app=express();

// config .env
dotenv.config();

// Coonecting to MongoDB
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan("dev"));

app.get("/api",(req,res)=>{
    res.send("<h1>Restaurants near me api..</h1>");
});

app.use("/api/auth",authRouter);
app.use("/api/restaurants",authenticateJWT,checkRedisClient,restoRouter);


const PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server is running http://localhost:${PORT}`);
});