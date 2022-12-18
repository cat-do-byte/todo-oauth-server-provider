import { NextFunction, Request, Response } from "express"

export const userOauth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    oauth: { token },
  } = res.locals
  if (token)
    req.user = {
      id: token.userId,
    }
  next()
}
