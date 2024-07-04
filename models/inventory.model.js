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
    },
    materials : [
        {   
            image: {
                type: String,
                required: true
            },
            title: {
              type: String,
              required: true,
            },
            description:{
                type: String,
                required: true
            },
            quantity: {
              type: Number,
              required: true,
              default: 1,
            },
            price: {
                type: Number,
                required: true,
                default: 0
            },
            unitsOfMeasurement: {
              type: String,
              required: true,
              default: "kg"
            },
            totalPrice: {
                type: Number,
                required: true,
                default: 0
            },
            orderId: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "Orders",
                required: true
            }
        }
    ],
},{timestamps: true})

export default mongoose.model("Inventory", inventorySchema)