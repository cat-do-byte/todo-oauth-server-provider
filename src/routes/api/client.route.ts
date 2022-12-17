import { Router } from "express"

import clientController from "../../controllers/client.controller"

const clientRouter = Router()

clientRouter.post("/", clientController.createClient)

clientRouter.get("/", clientController.showClient)

clientRouter.post("/get-client", clientController.getClient)

export default clientRouter
