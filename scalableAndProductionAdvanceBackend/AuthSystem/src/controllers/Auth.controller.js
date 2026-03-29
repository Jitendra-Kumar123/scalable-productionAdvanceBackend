import userModel from "../model/user.model.js"
import jwt from "jsonwebtoken"


async function registerUser(req, res){
    const {userName, email, password} = req.body;

    const user = await userModel.create({
        userName, email, password
    })

    const token = jwt.sign({
        id: user._id
    },
        process.env.JWT_SECRET
    )

    res.status(201).json({
        message: "user registered successfully with token",
        user, 
        token
    })
}

export default {
    registerUser
}