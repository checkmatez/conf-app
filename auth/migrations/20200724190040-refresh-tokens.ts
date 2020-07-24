import * as Knex from 'knex'

const TABLE_NAME = 'refresh_tokens'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, table => {
    table
      .uuid('id')
      .primary()
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'))
    table
      .string('jti')
      .unique()
      .notNullable()
    table.timestamp('expired_at').notNullable()
    table.timestamp('used_at')
    table.timestamp('revoked_at')
    table
      .uuid('user_id')
      .references('id')
      .inTable('users')
      .notNullable()
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(TABLE_NAME)
}
