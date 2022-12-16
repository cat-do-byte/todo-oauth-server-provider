import { NextFunction, Request, Response } from "express"

export const errorResponder = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.header("Content-Type", "application/json")
  // console.log(err)
  res.status(400).json({
    error: err.message,
  })
}
export const invalidPathHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(new Error("Not found"))
}
