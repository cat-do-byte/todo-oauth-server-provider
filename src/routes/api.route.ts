import { Router } from "express"

import todoRouter from "./api/todo.route"
import clientRouter from "./api/client.route"
import authRouter from "./api/auth.route"
import { auth } from "../middlewares/auth.middeware"
import oauthRouter from "./oauth.route"

const router = Router()

router.use("/todo", auth, todoRouter)
router.use("/clients", auth, clientRouter)
router.use("/oauth", auth, oauthRouter)
router.use("/", authRouter)

export default router
