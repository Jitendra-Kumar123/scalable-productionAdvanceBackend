import mongoose from "mongoose"

async function ConnectToDB(){
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("DataBase is connected");
}

export {ConnectToDB};