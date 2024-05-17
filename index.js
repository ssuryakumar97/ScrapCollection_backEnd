import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDb from './database/configDB.js'
import userRouter from './routes/user.routes.js'
import {Server} from "socket.io"

dotenv.config()

connectDb()

const app= express()
app.use(cors())
app.use(express.json())
app.use("/api", userRouter)

const server = app.listen(process.env.PORT || 5000, ()=>{
    console.log("App is listening to the port:",process.env.PORT);
})
export const io = new Server(server, {
    cors: {
        // origin: "http://localhost:5173"
        origin: "https://household-scrapcollection.netlify.app/"
    }
})


io.on("connection", (socket) => {
    console.log('A user connected');
    socket.emit("order registration", "hellow");
    socket.on("new order", (data) => {
        try {
            console.log(data);
            io.emit("order received", data);
        } catch (error) {
            console.log(error);
        }
        
    })
    socket.emit("message", "hi")
})


