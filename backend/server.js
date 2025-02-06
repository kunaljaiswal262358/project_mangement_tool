import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"
import userRoute from './routes/userRoute.js'
import projectRoute from './routes/projectRoute.js'
import taskRoute from './routes/taskRoute.js'
import mongodb from './database/database.js'
dotenv.config()

const app = express();

mongodb()
app.use(express.json())
app.use(cors())
app.use("/user",userRoute)
app.use("/projects",projectRoute)
app.use("/tasks",taskRoute)

app.listen(process.env.PORT,()=> console.log(`app is running on ${process.env.PORT}...`))
