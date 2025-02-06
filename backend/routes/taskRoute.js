import express from 'express'
import { createTask, deleteTask, getTask, updateTask } from '../controllers/taskController.js'
const Routes = express.Router();

Routes.get("/",getTask)
Routes.post("/",createTask)
Routes.patch("/:taskId",updateTask)
Routes.delete("/:taskId",deleteTask)

export default Routes;