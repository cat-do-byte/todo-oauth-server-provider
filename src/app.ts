import express, { Application } from "express"
import { connectDatabase } from "./config/database"
import User from "./models/user.model"

const app: Application = express()

connectDatabase()

const port = 4000
app.listen(port, () => console.log(`Running at port ${port}`))
