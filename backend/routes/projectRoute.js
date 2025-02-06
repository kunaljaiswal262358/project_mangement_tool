import express from 'express'
import { createProject, deleteProject, getProject, updateProject } from '../controllers/projectController.js';

const Route = express.Router();

Route.get("/",getProject);
Route.post("/",createProject);
Route.patch("/:projectId",updateProject);
Route.delete("/:projectId",deleteProject);

export default Route;