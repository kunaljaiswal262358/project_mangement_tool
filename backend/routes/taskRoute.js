import express from 'express'
import { createTask, deleteTask, getTask, getTaskByProjectId, updateTask } from '../controllers/taskController.js'
const Routes = express.Router();

Routes.get("/",getTask)
Routes.get("/:projectId",getTaskByProjectId)
Routes.post("/",createTask)
Routes.patch("/:taskId",updateTask)
Routes.delete("/:taskId",deleteTask)

export default Routes;