import mongoose from "mongoose";

async function ConnectDB(){
    await mongoose.connect(process.env.MONGO_URI);
}

export default ConnectDB;