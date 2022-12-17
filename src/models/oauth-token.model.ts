import { Model } from "objection"
import Client from "./client.model"
import User from "./user.model"

export default class OauthToken extends Model {
  id!: number
  userId!: number
  clientId!: number
  accessToken!: string
  refreshToken!: string
  accessTokenExpiresAt?: string
  refreshTokenExpiresAt?: string
  scope?: string | string[]

  static tableName = "oauth_tokens"

  static jsonSchema = {
    type: "object",
    required: ["userId", "clientId", "accessToken", "refreshToken"],

    properties: {
      id: { type: "integer" },
      userId: { type: "integer" },
      clientId: { type: "integer" },
      accessToken: { type: "string" },
      refreshToken: { type: "string" },
      accessTokenExpiresAt: { type: "date-time" },
      refreshTokenExpiresAt: { type: "date-time" },
      scope: { type: "string" },
    },
  }

  $parseDatabaseJson(json: any) {
    json = super.$formatJson(json)
    json.accessTokenExpiresAt = new Date(json.accessTokenExpiresAt)
    json.refreshTokenExpiresAt = new Date(json.refreshTokenExpiresAt)
    return json
  }

  static relationMappings = () => ({
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,

      join: {
        from: "oauth_tokens.userId",
        to: "users.id",
      },
    },
    client: {
      relation: Model.BelongsToOneRelation,
      modelClass: Client,

      join: {
        from: "oauth_tokens.clientId",
        to: "clients.id",
      },
    },
  })
}
