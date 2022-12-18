import * as OAuth2Server from "oauth2-server"
import AuthorizationCode from "../../models/authorization-code.model"
import ClientModel from "../../models/client.model"
import OauthToken from "../../models/oauth-token.model"

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

  saveToken: async (token, client, user): Promise<any> => {
    let tokenData = {
      userId: Number(user.id),
      clientId: Number(client.id),
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt
        ? token.accessTokenExpiresAt.toISOString()
        : undefined,
      refreshToken: token.refreshToken,
      refreshTokenExpiresAt: token.refreshTokenExpiresAt
        ? token.refreshTokenExpiresAt.toISOString()
        : undefined,
      scope: token.scope,
    }
    const newToken = await OauthToken.query().insert(tokenData)

    /* const newToken = OauthToken.query()
      .insertGraphAndFetch([tokenData], {
        relate: true,
      })
      .returning("*")
      .first() */

    return await OauthToken.query()
      .findById(newToken.id)
      .withGraphFetched("user")
      .withGraphFetched("client")

    // return newToken
  },

  getAccessToken: async (accessToken: string): Promise<any> => {
    const oauthToken = await OauthToken.query()
      .findOne({
        accessToken,
      })
      .withGraphFetched("user")
      .withGraphFetched("client")

    return oauthToken
  },

  verifyScope: async (token, scope: string): Promise<boolean> => {
    console.log(token.scope, scope)

    if (!token.scope) return false
    const userScope = Array.isArray(token.scope)
      ? token.scope
      : token.scope.split(",")
    if (userScope.includes(scope)) return true
    return false
  },
}

export default oauthHandle
