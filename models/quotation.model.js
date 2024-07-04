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
              default: "kg"
            },
            totalPrice: {
                type: Number,
                default: 0
            }
        }
    ],
    status: {
        type: String,
        default: "request"
    },
    notificationType: {
        type: String,
        default: "quotation"
    }
}, {timestamps: true})

export default mongoose.model("Quotation_request", quotationRequestSchema)