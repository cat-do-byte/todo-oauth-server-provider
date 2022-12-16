import { NextFunction, Request, Response } from "express"
import * as jwt from "jsonwebtoken"
import { IUserRequest } from "../interfaces/user-request.interface"

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"]
    if (!authHeader) throw new Error("Unauthorized : Missing token")

    const [_, token] = authHeader.split(" ")
    const currentUser = (await jwt.verify(token, "superSecret")) as IUserRequest
    if (!currentUser) throw new Error("Unauthorized : Can not get user")

    req.user = currentUser
    next()
  } catch (err) {
    next(err)
  }
}
