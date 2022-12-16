import { Model } from "objection"
import User from "./user.model"

export default class Todo extends Model {
  id!: number
  content!: string
  userId!: number

  static tableName = "todos"

  static jsonSchema = {
    type: "object",
    required: ["content", "userId"],

    properties: {
      id: { type: "integer" },
      content: { type: "string", minLength: 1 },
      userId: { type: ["integer", "null"] },
    },
  }

  static relationMappings = () => ({
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,

      join: {
        from: "todos.userId",
        to: "users.id",
      },
    },
  })
}
