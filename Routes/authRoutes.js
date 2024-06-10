import express from "express";
import register from "../middlewares/register.js";
import login from "../middlewares/login.js";
import authenticateJWT from "../middlewares/AuthenticateJWT.js";


const authRouter=express.Router();

// auth home
authRouter.get("/",(req,res)=>{
    res.send("<h1>Auth</h1>")
});

// register
authRouter.post("/register",register);

// login
authRouter.post("/login",login);

authRouter.get('/protected', authenticateJWT, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

export default authRouter;

