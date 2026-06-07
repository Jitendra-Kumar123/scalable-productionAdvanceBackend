import userModel from "../model/user.model.js";
import crypto from "crypto"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import {config} from "../config/config.js"
import {sessionModel} from "../model/session.model.js"
import{sendEmail} from "../services/email.service.js"
import { generateOtp, getOtpHtml } from "../utils/utils.js";
import { otpModel } from "../model/otp.model.js";


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

    const otp = generateOtp();
    const html = getOtpHtml();

    const otpHash = await bcrypt.hash(otp, 10);

    await otpModel.create({
        user,
        email,
        otp: otpHash
    })

    await sendEmail(email, "OTP Verification", `Your OTP code is ${otp}`, html)

    res.status(200).json({
        message: "User Registered Successfully",
        user: {
            userName: user.userName,
            email: user.email,
            verified: user.verified
        }
    })
}

// export async function register(req, res){
//     const {userName, email, password} = req.body;

//     const isUserAlreadyExists = await userModel.findOne({
//         $or: [
//             {userName},
//             {email}
//         ]
//     })

//     if(isUserAlreadyExists){
//         return res.status(409).json({
//             message: "UserName or email already exists"
//         })
//     }

//     // const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await userModel.create({
//         userName,
//         email,
//         password: hashedPassword
//     })

//     const refreshToken = jwt.sign({
//         id: user._id
//     }, config.JWT_SECRET,{
//         expiresIn: '7d'
//     })

//     const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

//     const session = await sessionModel.create({
//         userName: user._id,
//         refreshTokenHash,
//         ip: req.ip,
//         userAgent: req.headers['user-agent']
//     })

//     const accessToken = jwt.sign({
//         id: user._id,
//         sessionId: session._id
//     },
//      config.JWT_SECRET,
//     {
//         expiresIn: '15m'
//     })

//     // const refreshToken = jwt.sign({
//     //     id: user._id
//     // }, config.JWT_SECRET,{
//     //     expiresIn: '7d'
//     // })

//     res.cookie("refreshToken", refreshToken, {
//         httpOnly: true,
//         secure: true,
//         sameSite: "strict",
//         maxAge: 7 * 24 * 60 * 60 * 1000
//     });

//     res.status(200).json({
//         message: "User Registered Successfully",
//         user: {
//             userName: user.userName,
//             email: user.email,
//             password: user.password
//         },
//         accessToken: accessToken
//     })
// }

export async function login(req, res){
    const {email, password} = req.body;

    const user = await userModel.find({
        email: email
    })

    if(!user){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    if(!user.verified){
        return res.status(401).json({
            message: "email not verified"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

    if(!isPasswordValid){
        return res.status(401).json({
            message: "Invalid email or password"
        })
    }

    const refreshToken = jwt.sign({
        id: user._id
    }, config.JWT_SECRET, 
    {
        expiresIn: '7d'
    })

    const refreshTokenHash = await bcrypt.hash(password, 10);

    const session = await sessionModel.create({
        user: user._id,
        refreshTokenHash,
        ip: req.ip,
        userAgent: req.headers["user-agent"]
    })

    const accessToken = jwt.sign({
        id: user._id,
        sessionId: session._id
    }, config.JWT_SECRET,
    {
       expiresIn: '15m' 
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(200).json({
        message: 'logged in successfully',
        user: {
            user: user._id,
            email: user.email
        },
        accessToken
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

        const refreshTokenHash = await bcrypt.hash(password, 10);

        const session = await sessionModel.findOne({
            password: refreshTokenHash,
            revoked: false
        })

        if(!session){
            return res.status(401).json({
                message: "Invalid RefreshToken"
            })
        }

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

        const newRefreshTokenHash = await bcrypt.hash(password, 10);

        session.refreshTokenHash = newRefreshTokenHash;
        await session.save();

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

export async function logout (req, res){
    try{
        const refreshToken = req.cookies.refreshToken;

        if(!refreshToken){
            return res.status(401).json({
                message: "refresh token not found"
            })
        }

        const refreshTokenHash = await bcrypt.hash(password, 10);

        const session = await sessionModel.findOne({
            password: refreshTokenHash,
            revoked: false
        })

        if(!session){
            return res.status(400).json({
                message: "invalid refresh token"
            })
        }

        session.revoked = true;
        await session.save();

        res.clearCookie(refreshToken);

        res.status(200).json({
            message: "LoggedOut Successfully"
        })
    }
    catch(err){
        console.log("logout error: ", err);
        res.status(401).json({
            message: "No logout session perform"
        })
    }
}

export async function logoutAllDevices(req, res){
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
        return res.status(400).json({
            message: "RefreshToken Not Found"
        })
    }

    const decoded = jwt.verify(refreshToken, config.JWT_SECRET);

    await sessionModel.updateMany({
        user: decoded.id,
        revoked: false,
    },
    {
        revoked: true
    })

    res.clearCookie("refreshToken");

}

export async function verifyEmail(req, res){
    const {otp, email} = req.body;

    const otpHash = await bcrypt.hash(otp, 10);

    const otpDoc = await otpModel.findOne({
        email,
        otpHash
    })

    if(!otpDoc){
        return res.status(401).json({
            message: "Invalid OTP"
        })
    }

    const user = await userModel.findByIdAndUpdate(otpDoc.user, {
        verified: true
    })

    await otpModel.deleteMany({
        user: otpDoc.user
    })

    return res.status(200).json({
        message: "email verified successfully",
        user: {
            userName: user.userName,
            email: user.email,
            verified: user.verified
        }
    })
}