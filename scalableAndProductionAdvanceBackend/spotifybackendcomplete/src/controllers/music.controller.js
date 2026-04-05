import musicModel from "../model/music.model.js"
import jwt from "jsonwebtoken"
import uploadFile from "../services/storage.service.js";
import albumModel from "../model/album.model.js";

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

    const {title} = req.body;
    const file = req.file;

    const result = await uploadFile(file.buffer.toString('base64'));

    const music = await musicModel.create({
        uri: result.url,
        title,
        artist: req.user.id
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
    catch(err){
        return res.status(401).json({
            message: "unauthorized"
        })
    }
}

async function createAlbum(req, res){
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
                message: "You don't have an access to create music"
            })
        }

        const {title, musics} = req.body;

        const album = await albumModel.create({
            title,
            musics: musics,
            artist: req.user.id
        })

        res.status(201).json({
            message: "Album created successfully",
            album: {
                id: album._id,
                title: album.title,
                music: album.musics,
                artist: album.artist
            }
        })

    }catch(err){
        console.log("album creating error: ", err);
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
}

async function getAllMusic(req, res){
    const musics = await musicModel.find().limit(1).populate("artist", "userName email");

    res.status(200).json({
        message: "Music Fetched Successfylly",
        musics: musics
    })
}

async function getAllAlbum(req, res){
    const albums = await albumModel.find().select("title artist").populate("artist", "userName email");

    res.status(200).json({
        message: "Album Fetched Successfully",
        albums
    })
}

async function getAlbumById(req, res){
    const albumId = req.params.albumId;
    const album = await albumModel.findById(albumId).populate("artist", "userName email");

    res.status(200).json({
        message: "fetched by album from id",
        album
    })
}
export default {createMusic, createAlbum, getAllMusic, getAllAlbum, getAlbumById};