import * as Knex from 'knex'

const TYPE_NAME = 'user_role'

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`CREATE TYPE "${TYPE_NAME}" AS ENUM ('admin', 'attendee');`)
}

export async function down(knex: Knex): Promise<void> {
  // await knex.schema.dropTable(TABLE_NAME)
}
