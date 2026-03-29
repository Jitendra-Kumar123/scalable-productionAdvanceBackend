import mongoose from "mongoose";

async function ConnectToDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("DataBase is connected");
    }
    catch(err){
        console.log("database connection err: ", err)
    }
}

export {ConnectToDB};