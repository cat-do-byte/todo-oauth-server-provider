import express, { Application } from "express"
import cors from "cors"

import { connectDatabase } from "./config/database"
import { errorResponder, invalidPathHandler } from "./routes/error.route"
// import webRouter from "./routes/web.route"
import apiRouter from "./routes/api.route"

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

connectDatabase()

app.use(apiRouter)

app.use(errorResponder)
app.use(invalidPathHandler)

const port = 4000
app.listen(port, () => console.log(`Running at port ${port}`))
