import { Model, ForeignKeyViolationError, ValidationError } from "objection"
import Knex from "knex"
import knexConfig from "./knexfile"

export const connectDatabase = () => {
  const knex = Knex(knexConfig)
  Model.knex(knex)

  knex
    .raw("SELECT 1")
    .then(() => {
      console.log("Database connect is inited")
    })
    .catch((e) => {
      console.log("Cannot connect database")
      console.error(e)
    })
}
