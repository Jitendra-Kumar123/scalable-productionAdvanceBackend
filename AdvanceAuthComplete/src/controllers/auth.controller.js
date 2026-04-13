import userModel from "../model/user.model.js";
import crypto from "crypto"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import {config} from "../config/config.js"

export async function register(req, res){
    const {userName, email, password} = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            {userName},
            {email}
        ]
    })

    if(isUserAlreadyExists){
        return res.status(409).json({
            message: "UserName or email already exists"
        })
    }

    // const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        userName,
        email,
        password: hashedPassword
    })

    const token = jwt.sign({
        id: user._id
    },
     config.JWT_SECRET,
    {
        expiresIn: '1d'
    })

    res.cookie("token", token);

    res.status(200).json({
        message: "User Registered Successfully",
        user: {
            userName: user.userName,
            email: user.email,
            password: user.password
        },
        token: token
    })
}

export async function getMe(req, res){
    const token = req.headers.authorization?.split(" ") [1];

    if(!token){
        return res.status(404).json({
            message: "Token Not Found"
        })
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);

    const user = await userModel.findById(decoded.id)

    res.status(200).json({
        message: "User fetched Successfully",
        user: {
            userName: user.userName,
            email: user.email
        }
    })

   
}