import { NextFunction, Request, Response } from "express"
import Client from "../models/client.model"
import User from "../models/user.model"
import { generateId, generateSecret } from "../utils/generate-key"

export default {
  showClient: async (req: Request, res: Response) => {
    const currentUser = req.user

    const todos = await Client.query()
      .withGraphJoined("user")
      .where("user.id", currentUser.id)
    res.json(todos)
  },

  createClient: async (req: Request, res: Response, next: NextFunction) => {
    const currentUser = req.user
    let clientData = req.body
    try {
      const user = await User.query().findById(currentUser.id)
      if (!user) throw new Error("Not found User")

      // generate id and secret auto
      const clientId = generateId()
      const clientSecret = generateSecret(clientId)

      clientData = {
        ...clientData,
        clientId,
        clientSecret,
        redirectUris: ["http://localhost:4000/client-callback"],
        grants: ["authorization_code"],
      }

      const newTodo = await Client.query().insert({
        ...clientData,
        userId: currentUser.id,
      })

      res.json(newTodo)
    } catch (err) {
      next(err)
    }
  },
}
