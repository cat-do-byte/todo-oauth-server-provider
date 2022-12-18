import { NextFunction, Request, Response, Router } from "express"
import OAuthServer from "express-oauth-server"
import { auth } from "../middlewares/auth.middeware"
import { tokenFromBody } from "../middlewares/token-from-body.middleware"
import oauthHandle from "./oauth/oauth-handle"

export const outhServer = new OAuthServer({
  model: oauthHandle,
  //   debug: true,
  // continueMiddleware: true,
  useErrorHandler: true,
  // requireClientAuthentication: false,
})

const oauthRouter = Router()

// redirect back to dashboard
oauthRouter.get("/", (req: Request, res: Response) => {
  const { clientId } = req.query
  if (!clientId) throw new Error("CAn not found clientId")
  res.redirect("http://localhost:4001/oauth?clientId=" + clientId)
})

// change authorization code with token
oauthRouter.post(
  "/get-token",
  outhServer.token({
    requireClientAuthentication: { authorization_code: false },
  })
)

oauthRouter.post(
  "/accept",
  tokenFromBody,
  auth,
  outhServer.authorize({
    authenticateHandler: {
      handle: (req: Request) => {
        return req.user
      },
    },
  })
)

export default oauthRouter
