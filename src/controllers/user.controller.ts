import { NextFunction, Request, Response } from "express"
import * as jwt from "jsonwebtoken"
import User from "../models/user.model"

interface IRegister {
  email: string
  password: string
}

interface ILogin extends IRegister {}

export default {
  register: (req: Request, res: Response) => {
    res.render("register")
  },

  doRegister: async (req: Request, res: Response, next: NextFunction) => {
    const registerData = req.body as IRegister

    try {
      // use plain password only for demo
      const newUser = await User.query().insert(registerData)

      res.json({ data: newUser })
    } catch (err) {
      console.log(err)
      next(err)
    }
  },

  login: (req: Request, res: Response) => {
    res.render("login")
  },

  doLogin: async (req: Request, res: Response, next: NextFunction) => {
    const loginData = req.body as ILogin

    try {
      const user = await User.query().findOne(loginData)
      if (!user) throw new Error("User with login data is not correct")

      const { id, email } = user

      const token = jwt.sign({ id, email }, "superSecret", { expiresIn: "12h" })
      res.json({
        token,
      })
    } catch (err) {
      console.log(err)
      next(err)
    }
  },
}
