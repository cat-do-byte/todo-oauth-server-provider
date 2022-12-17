import { Model } from "objection"
import Client from "./client.model"
import User from "./user.model"

export default class AuthorizationCode extends Model {
  id!: number
  user!: number
  client!: number
  authorizationCode!: string
  expiresAt?: Date
  scope?: string | string[]

  static tableName = "authorization_codes"

  static jsonSchema = {
    type: "object",
    required: ["user", "client", "authorizationCode"],

    properties: {
      id: { type: "integer" },
      user: { type: "integer" },
      client: { type: "integer" },
      authorizationCode: { type: "string" },
      expiresAt: { type: "date-time" },
      scope: { type: "string" },
    },
  }

  static relationMappings = () => ({
    user_obj: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,

      join: {
        from: "authorization_codes.user",
        to: "users.id",
      },
    },
    client_obj: {
      relation: Model.BelongsToOneRelation,
      modelClass: Client,

      join: {
        from: "authorization_codes.client",
        to: "clients.id",
      },
    },
  })
}
