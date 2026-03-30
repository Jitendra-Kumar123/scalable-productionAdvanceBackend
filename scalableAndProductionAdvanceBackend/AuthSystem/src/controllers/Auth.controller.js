import userModel from "../model/user.model.js"
import jwt from "jsonwebtoken"


async function registerUser(req, res){
    const {userName, email, password} = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        email: email
    })

    if(isUserAlreadyExists){
        return res.status(409).json({
        message: "user already exists"
    })
    }


    const user = await userModel.create({
        userName, email, password
    })

    const token = jwt.sign({
        id: user._id
    },
        process.env.JWT_SECRET
    )

    res.cookie("token", token);

    res.status(201).json({
        message: "user registered successfully with token",
        user
    })
}

export default {
    registerUser
}