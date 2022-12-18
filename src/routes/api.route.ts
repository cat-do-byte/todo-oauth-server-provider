import { Router } from "express"

import todoRouter from "./api/todo.route"
import clientRouter from "./api/client.route"
import authRouter from "./api/auth.route"
import { auth } from "../middlewares/auth.middeware"
import oauthRouter from "./oauth.route"
import { tokenFromBody } from "../middlewares/token-from-body.middleware"
import oauthTodoRouter from "./oauth/oauth-todo.route"

const router = Router()

router.use("/todo", auth, todoRouter)
router.use("/clients", auth, clientRouter)
router.use("/oauth", oauthRouter)
router.use("/oauth/todo", oauthTodoRouter)
router.use("/", authRouter)

export default router
