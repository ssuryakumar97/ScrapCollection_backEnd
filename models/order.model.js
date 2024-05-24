import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    collectionStatus:{
        type: String,
        default: "pending"
    },
    collectionAgentStatus:{
        type: String,
        default: "notAssigned"
    },
    collectionAgentDetails: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        default: null
    } ,
    materialSoldDetails : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "SoldMaterial",
        default: null
    }
}, {timestamps: true})

export default mongoose.model("Orders", orderSchema)