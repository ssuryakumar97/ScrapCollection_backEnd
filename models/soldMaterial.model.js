import mongoose from "mongoose";

const soldMaterialSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    agentEmail: {
      type: String,
      required: true,
    },
    materialSold: [
      {
        title: {
          type: String,
          required: true,
        },
        description:{
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        price:{
          type: Number,
          required: true
        },
        unitsOfMeasurement: {
          type: String,
          required: true,
        },
        totalPrice: {
            type: Number,
            required: true
        }
      },
    ],
    orderDetails: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Orders",
        // default:null
    }
  },
  { timestamps: true }
);

export default mongoose.model("SoldMaterial", soldMaterialSchema);
