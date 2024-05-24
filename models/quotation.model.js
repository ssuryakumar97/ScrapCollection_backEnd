import mongoose from "mongoose"

const quotationRequestSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
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
            unitsOfMeasurement: {
              type: String,
              required: true,
            },
            totalPrice: {
                type: Number,
                default: 0
            }
        }
    ],
    status: {
        type: String,
        default: "creation"
    }
}, {timestamps: true})

export default mongoose.model("Quotation_request", quotationRequestSchema)