import mongoose, { mongo } from "mongoose"

const sessionSchema = new mongoose.Schema({
    userName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "user is required"]
    },
    refreshTokenHash: {
        type: String,
        required: [true, "refreshTokenHash is required"]
    },
    ip:{
        type: String,
        required: [true, "ip is required"]
    },
    userAgent: {
        type: String,
        required: [true, "userAgent is required"]
    },
    revoked: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const sessionModel = mongoose.model("sessions", sessionSchema)

export {sessionModel};

