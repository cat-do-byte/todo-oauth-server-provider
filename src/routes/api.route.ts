import { Router } from "express"

import todoRouter from "./api/todo.route"
import authRouter from "./api/auth.route"

const router = Router()

router.use("/todo", todoRouter)
router.use("/", authRouter)

export default router
