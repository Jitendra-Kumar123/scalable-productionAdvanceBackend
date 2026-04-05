import jwt from "jsonwebtoken"

async function authArtist(req, res, next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(decoded.role !== "artist"){
            return res.status(403).json({
                message: "You don't have access"
            })
        }
        req.user = decoded;
        next();
    }
    catch(err){
        console.log("Auth Middleware Error: ", err);
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
}

async function authUser(req, res, next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }


    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(decoded.role !== "user" && decoded.role !== "artist"){
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        req.user = decoded;
        next();
    }
    catch(err){
        console.log("AuthUser Middleware error: ", err);
        res.status(401).json({
            message: "Unauthorized"
        })
    }
}

export default {authArtist, authUser};