import { Model } from "objection"
import User from "./user.model"

export default class Client extends Model {
  id!: number
  name!: string
  user!: number
  clientId!: string
  clientSecret!: string
  redirectUris?: string[]
  grants?: string[]

  static tableName = "clients"

  static jsonSchema = {
    type: "object",
    required: ["name", "user", "clientId", "clientSecret"],

    properties: {
      id: { type: "integer" },
      name: { type: "string", minLength: 1 },
      user: { type: "integer" },
      clientId: { type: "string" },
      clientSecret: { type: "string" },
      redirectUris: { type: "array", default: [], items: { type: "string" } },
      grants: { type: "array", default: [], items: { type: "string" } },
    },
  }

  static relationMappings = () => ({
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,

      join: {
        from: "clients.user",
        to: "users.id",
      },
    },
  })
}
