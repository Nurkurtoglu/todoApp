/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('done').del()
  await knex('done').insert([
    { done_id: 1, done_text: 'rowValue1' },
    { done_id: 2, done_text: 'rowValue2' },
    { done_id: 3, done_text: 'rowValue3' }
  ]);
};
