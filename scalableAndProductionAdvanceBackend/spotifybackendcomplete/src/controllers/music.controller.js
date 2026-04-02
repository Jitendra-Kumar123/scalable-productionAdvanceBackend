import musicModel from "../model/music.model.js"

async function createMusic(req, res){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "unauthorized"
        })
    }

    
}

export default {createMusic};