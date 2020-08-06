import Knex from 'knex';


export async function up(knex: Knex) {
// Fazer as alterações


return knex.schema.createTable('connections', table => {
    table.increments('id').primary();
   
    table.integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');


    table.timestamp('created_at')
    .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    .notNullable()
});
}
// now() pega o horário atual que esse registro
// está sendo criado

export async function down(knex: Knex) {
// voltar alteração anterior

return knex.schema.dropTable('connections');
}