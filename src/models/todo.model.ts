import { Model } from "objection"
import User from "./user.model"

export default class Todo extends Model {
  id!: number
  content!: string
  user_id!: number

  static tableName = "todos"

  static jsonSchema = {
    type: "object",
    required: ["content", "user_id"],

    properties: {
      id: { type: "integer" },
      content: { type: "string", minLength: 1 },
      user_id: { type: ["integer", "null"] },
    },
  }

  static relationMappings = () => ({
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,

      join: {
        from: "todos.user_id",
        to: "users.id",
      },
    },
  })
}
