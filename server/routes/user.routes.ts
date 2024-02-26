import { Router } from 'express'
import UserController from '../controllers/user.controller'
// const { authenticate, authenticateRefresh } = require('../config/jwt.config');

const userRouter = Router()

  userRouter.get("/api/users", UserController.getAllUsers);
  // userRouter.get("/api/users", UserController.getCurrentUser);
  // userRouter.get("/api/users/:id", UserController.getUser);
  // userRouter.get("/api/refresh", UserController.refreshToken);
  userRouter.post("/api/register", UserController.createUser);
  // userRouter.post("/api/register", UserController.register);
  // userRouter.post("/api/login", UserController.login);
  // userRouter.post("/api/logout", UserController.logout); 
  // userRouter.patch("/api/users/:id", UserController.updateUser);

  export default userRouter