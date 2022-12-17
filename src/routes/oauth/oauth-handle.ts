import * as OAuth2Server from "oauth2-server"

const oauthHandle: OAuth2Server.AuthorizationCodeModel = {
  getAuthorizationCode: (code: string) => {
    return Promise.resolve(false)
  },

  saveAuthorizationCode: (code, client, user) => {
    return Promise.resolve(false)
  },

  revokeAuthorizationCode: () => {
    return Promise.resolve(false)
  },

  getClient: () => {
    return Promise.resolve(false)
  },

  saveToken: () => {
    return Promise.resolve(false)
  },

  getAccessToken: () => {
    return Promise.resolve(false)
  },

  verifyScope: () => {
    return Promise.resolve(false)
  },
}

export default oauthHandle
