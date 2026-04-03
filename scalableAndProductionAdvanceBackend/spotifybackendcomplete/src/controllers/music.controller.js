import musicModel from "../model/music.model.js"
import jwt from "jsonwebtoken"
import uploadFile from "../services/storage.service.js";

async function createMusic(req, res){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "unauthorized"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(decoded.role !== "artist"){
            return res.status(403).json({
                message: "You don't have access to create an music"
            })
        }
    }
    catch(err){
        return res.status(401).json({
            message: "unauthorized"
        })
    }

    const {title} = req.body;
    const file = req.file;

    const result = await uploadFile(file.buffer.toString('base64'));

    const music = await musicModel.create({
        uri: result.url,
        title,
        artist: decoded.id
    })

    res.status(201).json({
        message: "music uploaded successfully",
        music: {
            id: music._id,
            uri: music.uri,
            title: music.title,
            artist: music.artist
        }
    })
}

export default {createMusic};