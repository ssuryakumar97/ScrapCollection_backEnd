import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isCollectionAgent: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: "notAssigned"
    },
    assignmentDetails:{
        type:  mongoose.SchemaTypes.ObjectId,
        ref: "Orders",
        default: null
    },
    token: String,

}, {timestamps: true})

export default mongoose.model("User", userSchema)