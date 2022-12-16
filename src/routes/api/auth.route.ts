import { Router } from "express"

import userController from "../../controllers/user.controller"
import { auth } from "../../middlewares/auth.middeware"

const authRouter = Router()

authRouter.post("/register", userController.doRegister)

authRouter.post("/login", userController.doLogin)

export default authRouter
