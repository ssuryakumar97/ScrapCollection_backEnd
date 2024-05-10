import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDb from './database/configDB.js'
import userRouter from './routes/user.routes.js'

dotenv.config()

connectDb()

const app= express()
app.use(cors())
app.use(express.json())
app.use("/api", userRouter)

app.listen(process.env.PORT || 5000, ()=>{
    console.log("App is listening to the port:",process.env.PORT);
})
