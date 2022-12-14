import { Model, ForeignKeyViolationError, ValidationError } from "objection"
import Knex, { CreateTableBuilder } from "knex"
import knexConfig from "./knexfile"

export const connectDatabase = async () => {
  const knex = Knex(knexConfig)
  Model.knex(knex)

  await knex
    .raw("SELECT 1")
    .then(() => {
      console.log("Database connect is initted")
    })
    .catch((e) => {
      console.log("Cannot connect database")
      console.error(e)
    })

  // knex.schema.createTable()
  await initTables(knex)
}

async function initTables(knex: any) {
  if (!(await knex.schema.hasTable("users"))) {
    console.log("create table users")
    await knex.schema.createTable("users", (table: CreateTableBuilder) => {
      table.increments("id").primary()
      table.string("email")
      table.string("password")
    })
  }
}
