import { Router } from "express"

import todoController from "../../controllers/todo.controller"

const todoRouter = Router()

todoRouter.post("/", todoController.createTodo)

todoRouter.get("/", todoController.showTodo)

todoRouter.delete("/:id", todoController.deleteTodo)

export default todoRouter
