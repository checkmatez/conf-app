import * as Knex from 'knex'

const TABLE_NAME = 'chat_rooms'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, (table) => {
    table
      .uuid('id')
      .primary()
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'))
    table.string('name', 255).notNullable()
    table.timestamps(true, true)
    table.timestamp('deleted_at')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(TABLE_NAME)
}
