import { Router } from "express"

import clientController from "../../controllers/client.controller"

const clientRouter = Router()

clientRouter.post("/", clientController.createClient)

clientRouter.get("/", clientController.showClient)

export default clientRouter
