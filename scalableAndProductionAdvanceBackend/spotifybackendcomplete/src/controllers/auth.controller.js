import userModel from "../model/user.model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

async function registerUser(req, res){
    const {userName, email, password, role= 'user' } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            {userName},
            {email}
        ]
    })

    if(isUserAlreadyExists){
        return res.status(409).json({
            message: "user already exists"
        })
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        userName,
        email,
        password: hash,
        role
    })

    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET);

    res.cookie("token", token);

    res.status(201).json({
        message: "user registered successfully",
        user: {
        id: user._id,
        email: user.email,
        userName: user.userName,
        role: user.role
    }

    })
}

async function loginUser(req, res){
    const {userName, email, password} = req.body;

    const user = await userModel.findOne({
        $or: [
            {userName},
            {email}
        ]
    })

    if(!user){
        return res.status(401).json({
            message: "Invalid Credentials"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET)

    res.cookie("token", token);

    res.status(200).json({
        message: "user loggedin successfully",
        user: {
            id: user._id,
            email: user.email,
            userName: user.userName,
            role: user.role
        }
    })


}

async function logoutUser(req, res){
    res.cookie("token", "");

    res.status(200).json({
        message: "User logged out successfully"
    })
}

export default {registerUser, loginUser, logoutUser};