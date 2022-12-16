import { Router } from "express"

import todoController from "../../controllers/todo.controller"
import { auth } from "../../middlewares/auth.middeware"

const todoRouter = Router()

todoRouter.post("/", todoController.createTodo)

todoRouter.get("/", auth, todoController.showTodo)

export default todoRouter
