import mongoose from "mongoose";

const materialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "none"
    },
    price: {
      type: Number,
      required: true,
    },
    unitsOfMeasurement: {
        type: String,
        required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Material", materialSchema);
