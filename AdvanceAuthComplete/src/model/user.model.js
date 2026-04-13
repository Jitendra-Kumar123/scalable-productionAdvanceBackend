import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "userName is required"],
        unique: [true, "username must be unique"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "email must be unique"],
        trim: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
        unique: [true, "password must be unique"],
        trim: true
    }
})

const userModel = mongoose.model("user", userSchema);

export default userModel;