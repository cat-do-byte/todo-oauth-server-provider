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
  // migrate

  if (!(await knex.schema.hasTable("users"))) {
    console.log("create table users")
    await knex.schema.createTable("users", (table: CreateTableBuilder) => {
      table.increments("id").primary()
      table.string("email")
      table.string("password")
    })
  }

  if (!(await knex.schema.hasTable("todos"))) {
    console.log("create table todos")
    await knex.schema.createTable("todos", (table: CreateTableBuilder) => {
      table.increments("id").primary()
      table.string("content")
      table.integer("user_id").references("user.id")
    })
  }
}
