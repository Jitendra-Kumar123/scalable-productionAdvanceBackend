import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    }
})

const postModel = mongoose.model("post", postSchema)

export default postModel;