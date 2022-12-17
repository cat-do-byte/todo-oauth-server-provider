import { NextFunction, Request, Response } from "express"

export const tokenFromBody = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.body
  if (authorization) req.headers["authorization"] = authorization
  next()
}
