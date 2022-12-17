import { Model } from "objection"
import Client from "./client.model"
import User from "./user.model"

export default class AuthorizationCode extends Model {
  id!: number
  userId!: number
  clientId!: number
  authorizationCode!: string
  expiresAt?: string
  scope?: string | string[]

  static tableName = "authorization_codes"

  static jsonSchema = {
    type: "object",
    required: ["userId", "clientId", "authorizationCode"],

    properties: {
      id: { type: "integer" },
      userId: { type: "integer" },
      clientId: { type: "integer" },
      authorizationCode: { type: "string" },
      expiresAt: { type: "date-time" },
      scope: { type: "string" },
    },
  }

  $parseDatabaseJson(json: any) {
    json = super.$formatJson(json)
    json.expiresAt = new Date(json.expiresAt)
    return json
  }

  static relationMappings = () => ({
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,

      join: {
        from: "authorization_codes.userId",
        to: "users.id",
      },
    },
    client: {
      relation: Model.BelongsToOneRelation,
      modelClass: Client,

      join: {
        from: "authorization_codes.clientId",
        to: "clients.id",
      },
    },
  })
}
