import { NextFunction, Request, Response } from "express"

export const errorResponder = (err: any, req: Request, res: Response) => {
  res.header("Content-Type", "application/json")
  res.status(err.statusCode).send(JSON.stringify(err, null, 4))
}
export const invalidPathHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(new Error("Not found"))
}
