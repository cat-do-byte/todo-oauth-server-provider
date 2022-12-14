import { Model } from "objection"

export default class User extends Model {
  id!: number
  email!: string
  password!: string

  static tableName = "users"

  static jsonSchema = {
    type: "object",
    required: ["email", "password"],

    properties: {
      id: { type: "integer" },
      email: { type: "string", minLength: 1, maxLength: 255 },
      password: { type: "string", minLength: 1 },
    },
  }
}
