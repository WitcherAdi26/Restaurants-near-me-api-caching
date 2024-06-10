import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";


const register=async (req,res)=>{
    const {username,email,password}=req.body;

    if(!username || !email || !password){
        return res.status(400).json({"msg":"Please fill out the fields"});
    }

    try {
        const userExists=await userModel.findOne({email}||{username});
        if(userExists){
            return res.status(400).json({"msg":"User with this email or usernme already exists"});
        }
    
        const saltRounds=parseInt(process.env.SALT_ROUNDS);
        const hashedPassword=await bcrypt.hash(password,saltRounds);
    
        const newUser=new userModel({username,email,password:hashedPassword});
        await newUser.save();
    
        return res.status(202).json({"msg":"User Registered Successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({"msg":"Server Error"});
    }
};

export default register;