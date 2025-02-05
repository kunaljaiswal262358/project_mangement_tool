import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"
import userRoute from './routes/userRoute.js'
import mongodb from './database/database.js'
dotenv.config()

const app = express();

mongodb()
app.use(express.json())
app.use(cors())
app.use("/user",userRoute)

app.listen(process.env.PORT,()=> console.log(`app is running on ${process.env.PORT}...`))
