import * as Knex from 'knex'

const TABLE_NAME = 'messages'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, (table) => {
    table
      .uuid('id')
      .primary()
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'))
    table.string('text', 1023).notNullable()
    table
      .uuid('author_id')
      .references('id')
      .inTable('users')
      .notNullable()
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table
      .uuid('chat_room_id')
      .references('id')
      .inTable('chat_rooms')
      .notNullable()
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table.timestamps(true, true)
    table.timestamp('deleted_at')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(TABLE_NAME)
}
