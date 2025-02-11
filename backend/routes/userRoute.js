import express from 'express'
import userMiddleware from '../middleware/userMiddleware.js';
import { getUsers, login, logout, profile, register } from '../controllers/userController.js';
const Routes = express.Router();

Routes.post("/register",userMiddleware,register);
Routes.post("/login",login)
Routes.get("/",getUsers)
Routes.post("/profile",profile)
Routes.post("/logout",logout)

export default Routes;