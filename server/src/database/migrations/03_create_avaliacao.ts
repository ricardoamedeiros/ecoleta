import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('avaliacao', (table) => {
    table.increments('id').primary();
    table.integer('point_id').notNullable().references('id').inTable('points');
    table.string('name').notNullable();
    table.string('descricao').notNullable();
    table.integer('rating').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('avaliacao');
}
