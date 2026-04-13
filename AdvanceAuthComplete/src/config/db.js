import mongoose from "mongoose";
import { config } from "../config/config.js"

async function ConnectToDB(){
    try{
        await mongoose.connect(config.MONGODB_URI);
        console.log("Database is connected");
    }
    catch(err){
        console.log("database connection error: ", err);
    }
    
}

export default ConnectToDB;