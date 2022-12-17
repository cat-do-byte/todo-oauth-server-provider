import { Request, Router } from "express"
import OAuthServer from "express-oauth-server"
import oauthHandle from "./oauth/oauth-handle"

const outhServer = new OAuthServer({
  model: oauthHandle,
  //   debug: true,
  // continueMiddleware: true,
  useErrorHandler: true,
  // requireClientAuthentication: false,
})

const oauthRouter = Router()

oauthRouter.get(
  "/accept",
  async (req, res, next) => {
    /* const user = userModel.find((user) => user.username === "pikachu")
    req.user = user */
    return next()
  },
  outhServer.authorize({
    authenticateHandler: {
      handle: (req: Request) => {
        return req.user
      },
    },
  })
)

export default oauthRouter
