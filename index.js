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
        origin: "*"
        // origin: "http://localhost:5173"
        // origin: "https://household-scrapcollection.netlify.app/"
    }
})


io.on("connection", (socket) => {
    console.log('A user connected');
    socket.emit("order registration", "hellow");
    socket.on("new order", (data) => {
        try {
            
            io.emit("order received", data);
            console.log("new order")
        } catch (error) {
            console.log(error);
        }
        
    })
    socket.on("order assigned", (data) => {
        try {
            io.emit("new order assigned", data);
            console.log("order assigned")
        } catch (error) {
            console.log(error);
        }
        
    })
    socket.on("quotation received", (data) => {
        io.emit("new quotation received", data)
        console.log(data)
    })
    socket.on("quotation updated", (data) => {
        io.emit("quotation updated data", data)
        console.log(data)
    })
    socket.emit("message", "hi")
})


