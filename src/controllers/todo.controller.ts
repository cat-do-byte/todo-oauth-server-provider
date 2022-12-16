import { NextFunction, Request, Response } from "express"
import Todo from "../models/todo.model"

export default {
  showTodo: async (req: Request, res: Response) => {
    const todos = await Todo.query().withGraphJoined("user")
    // .where()
    res.json(todos)
  },

  createTodo: async (req: Request, res: Response) => {
    res.json({ a: "f" })
  },
}
