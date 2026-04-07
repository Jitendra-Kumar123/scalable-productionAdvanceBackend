import mongoose from "mongoose";
import { config } from "./config.js";

async function ConnectToDB(){
    try{
        await mongoose.connect(config.MONGO_URI);
        console.log("Database is connected");
    }
    catch(err){
        console.log("database connection error: ", err);
        res.status(400).json({
            message: "database error"
        })
    }
    
}

export default ConnectToDB;