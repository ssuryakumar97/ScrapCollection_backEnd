import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const connectDb = async() => {
    try {
        const Connection = await mongoose.connect(process.env.MONGO_URL)
        console.log("Your app is connected to mongodb");
        return Connection
    } catch (error) {
        console.log(error);
    }
}

export default connectDb