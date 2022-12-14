import { Router } from "express"

import userController from "../controllers/user.controller"

const router = Router()

router.get("/register", userController.register)
router.post("/register", userController.doRegister)

router.get("/login", userController.login)
router.post("/login", userController.doLogin)

export default router
