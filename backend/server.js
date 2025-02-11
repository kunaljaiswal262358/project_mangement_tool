import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"
import userRoute from './routes/userRoute.js'
import projectRoute from './routes/projectRoute.js'
import taskRoute from './routes/taskRoute.js'
import mongodb from './database/database.js'
import cookieParser from "cookie-parser"
dotenv.config()

const app = express();

mongodb()
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: "http://localhost:3000",credentials: true}))
app.use("/user",userRoute)
app.use("/projects",projectRoute)
app.use("/tasks",taskRoute)

app.listen(process.env.PORT,()=> console.log(`app is running on ${process.env.PORT}...`))
