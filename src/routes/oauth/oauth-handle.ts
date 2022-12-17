import * as OAuth2Server from "oauth2-server"
import AuthorizationCode from "../../models/authorization-code.model"
import ClientModel from "../../models/client.model"

const oauthHandle: OAuth2Server.AuthorizationCodeModel = {
  getAuthorizationCode: async (code: string): Promise<any> => {
    const authCode = await AuthorizationCode.query()
      .findOne({
        authorizationCode: code,
      })
      .withGraphFetched("user")
      .withGraphFetched("client")
    return authCode
  },

  saveAuthorizationCode: async (code, client, user): Promise<any> => {
    let authorizationCodeData = {
      userId: Number(user.id),
      clientId: Number(client.id),
      authorizationCode: code.authorizationCode,
      expiresAt: code.expiresAt.toISOString(),
      scope: code.scope,
    }
    const newAuthCode = AuthorizationCode.query().insert(authorizationCodeData)

    return newAuthCode
  },

  revokeAuthorizationCode: async (code) => {
    let result = await AuthorizationCode.query()
      .delete()
      .where({ authorizationCode: code.authorizationCode })
    return true
  },

  getClient: async (clientId: string, clientSecret: string): Promise<any> => {
    const params: { clientId: string; clientSecret?: string } = {
      clientId: clientId,
    }
    if (clientSecret) {
      params.clientSecret = clientSecret
    }
    return ClientModel.query().findOne(params)
  },

  saveToken: (token, client, user) => {
    console.log("saaaaaaaaev")
    return Promise.resolve(false)
  },

  getAccessToken: () => {
    console.log("get token...")
    return Promise.resolve(false)
  },

  verifyScope: () => {
    return Promise.resolve(false)
  },
}

export default oauthHandle
