import mongoose from "mongoose"

const inventorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    totalQuantity:{
        type: Number,
        required: true
    },
    unitsOfMeasurement: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true,
    }
},{timestamps: true})

export default mongoose.model("Inventory", inventorySchema)