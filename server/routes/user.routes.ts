import { Router } from 'express'
import UserController from '../controllers/user.controller'
import { authenticate, authenticateRefresh } from '../config/jwt.config'

const userRouter = Router()

  userRouter.get("/api/users", authenticate, UserController.getCurrentUser);
  userRouter.get("/api/users/:id", UserController.getUserById); 
  userRouter.get("/api/refresh", authenticateRefresh, UserController.refreshToken);
  userRouter.post("/api/register", UserController.register);
  userRouter.post("/api/login", UserController.login);
  userRouter.post("/api/logout", UserController.logout); 
  // userRouter.patch("/api/users/:id", UserController.updateUser);

  export default userRouter