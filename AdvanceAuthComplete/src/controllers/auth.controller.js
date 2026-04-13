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

    const accessToken = jwt.sign({
        id: user._id
    },
     config.JWT_SECRET,
    {
        expiresIn: '15m'
    })

    const refreshToken = jwt.sign({
        id: user._id
    }, config.JWT_SECRET,{
        expiresIn: '7d'
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
        message: "User Registered Successfully",
        user: {
            userName: user.userName,
            email: user.email,
            password: user.password
        },
        accessToken: accessToken
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

export async function refreshToken(req, res){
    try{
        const refreshToken = req.cookies.refreshToken;

        if(!refreshToken){
            return res.status(401).json({
                message: "Refresh Token is not found"
            })
        }

        const decoded = jwt.verify(refreshToken, config.JWT_SECRET);

        const accessToken = jwt.sign(
        {
            id: decoded._id
        }, 
            config.JWT_SECRET, 
        {
            expiresIn: '15m'
        });

        const newRefreshToken = jwt.sign({
            id: decoded._id
        }, config.JWT_SECRET, {
            expiresIn: '7d'
        })

        res.cookie("newRefreshToken", newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            message: "Access Token Refresh Successfully", 
            accessToken
        })

    }catch(err){
        return res.status(403).json({
            message: "Invalid or Token expired",
            err
        })
    }
}