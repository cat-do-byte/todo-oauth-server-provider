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
      table.integer("userId").references("users.id")
    })
  }

  if (!(await knex.schema.hasTable("clients"))) {
    console.log("create table clients")
    await knex.schema.createTable("clients", (table: CreateTableBuilder) => {
      table.increments("id").primary()
      table.string("name")
      table.integer("user").references("users.id")
      table.string("clientId")
      table.string("clientSecret")
      table.specificType("redirectUris", "string ARRAY")
      table.specificType("grants", "string ARRAY")
    })
  }

  if (!(await knex.schema.hasTable("authorization_codes"))) {
    console.log("create table authorization_codes")
    await knex.schema.createTable(
      "authorization_codes",
      (table: CreateTableBuilder) => {
        table.increments("id").primary()
        table.integer("user").references("users.id")
        table.integer("client").references("clients.id")
        table.string("authorizationCode")
        table.timestamp("expiresAt")
        table.string("scope")
      }
    )
  }
}
