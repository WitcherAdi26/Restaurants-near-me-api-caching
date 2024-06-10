import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const login=async (req,res)=>{
    const {email,password}=req.body;

    if(!email || !password){
        return res.status(400).json({"msg":"Please fill out the fields"});
    }

    try {
        const userExists=await userModel.findOne({email});
        if(!userExists){
            return res.status(404).json({"msg":"Invalid Credentials"});
        }

        const isMatch=await bcrypt.compare(password,userExists.password);
        if(!isMatch){
            return res.status(400).json({"msg":"Invalid Credentials"});
        }

        const token = jwt.sign({ username: userExists.username,email }, process.env.SECRET_KEY, { expiresIn: '1h' });
        return res.status(200).json({"msg":"User Logged In Successfully","token":token});
    } catch (error) {
        console.log(error);
        return res.status(500).json({"msg":"Server Error"});
    }
};

export default login;