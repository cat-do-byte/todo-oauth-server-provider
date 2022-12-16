import { Router } from "express"

import todoRouter from "./api/todo.route"
import authRouter from "./api/auth.route"
import { auth } from "../middlewares/auth.middeware"

const router = Router()

router.use("/todo", auth, todoRouter)
router.use("/", authRouter)

export default router
