import express, { Application } from "express"

const app: Application = express()

const port = 4000
app.listen(port, () => console.log(`Running at port ${port}`))
