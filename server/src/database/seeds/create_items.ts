import Knex from 'knex';

export async function seed(knex: Knex) {
  await knex('items').insert([
    { title: 'Produtos', image: 'lampadas.svg' },
    { title: 'Álcool em gel', image: 'baterias.svg' },
    { title: 'Serviço', image: 'papeis-papelao.svg' },
    { title: 'Financeiro', image: 'eletronicos.svg' },
    { title: 'Alimentos', image: 'organicos.svg' },
    { title: 'Bebidas', image: 'oleo.svg' },
  ]);
}
