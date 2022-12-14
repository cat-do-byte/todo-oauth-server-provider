import express, { Application } from "express"
import path from "path"
import { connectDatabase } from "./config/database"
import { errorResponder, invalidPathHandler } from "./routes/error.route"
import webRouter from "./routes/web.route"

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded())

app.use(express.static("src/public"))
app.set("views", path.join(__dirname, "/views"))
app.set("view engine", "ejs")

connectDatabase()

app.use(webRouter)

app.use(errorResponder)
app.use(invalidPathHandler)

const port = 4000
app.listen(port, () => console.log(`Running at port ${port}`))
