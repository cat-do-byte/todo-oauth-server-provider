import { Model } from "objection"
import User from "./user.model"

export default class Todo extends Model {
  id!: number
  content!: string
  user!: User

  static tableName = "todos"

  static jsonSchema = {
    type: "object",
    required: ["content", "user"],

    properties: {
      id: { type: "integer" },
      content: { type: "string", minLength: 1 },
      user_id: { type: ["integer", "null"] },
    },
  }

  static relationMappings = () => ({
    user: {
      relation: Model.BelongsToOneRelation,
      // The related model.
      modelClass: User,

      join: {
        from: "todos.user_id",
        to: "users.id",
      },
    },
  })
}
