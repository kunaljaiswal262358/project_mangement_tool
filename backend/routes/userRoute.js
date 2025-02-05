import express from 'express'
import userMiddleware from '../middleware/userMiddleware.js';
import { login, register } from '../controllers/userController.js';
const Routes = express.Router();

Routes.post("/register",userMiddleware,register);
Routes.post("/login",login)

export default Routes;