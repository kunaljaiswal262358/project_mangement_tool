import express from 'express'
import { createProject, deleteProject, getProject, getProjectById, updateProject } from '../controllers/projectController.js';

const Route = express.Router();

Route.get("/",getProject);
Route.get("/:projectId",getProjectById);
Route.post("/",createProject);
Route.patch("/:projectId",updateProject);
Route.delete("/:projectId",deleteProject);

export default Route;