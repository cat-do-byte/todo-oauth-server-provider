import { Router } from "express"

import todoController from "../../controllers/todo.controller"
import { userOauth } from "../../middlewares/user-oauth.middleware"
import { outhServer } from "../oauth.route"

const oauthTodoRouter = Router()

oauthTodoRouter.post(
  "/",
  outhServer.authenticate({ scope: "todo.create" }),
  userOauth,
  todoController.createTodo
)

oauthTodoRouter.get(
  "/",
  outhServer.authenticate({ scope: "todo.read" }),
  userOauth,
  todoController.showTodo
)

oauthTodoRouter.delete(
  "/:id",
  outhServer.authenticate({ scope: "todo.delete" }),
  userOauth,
  todoController.deleteTodo
)

export default oauthTodoRouter
