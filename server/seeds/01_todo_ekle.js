/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('todo').del()
  await knex('todo').insert([
    { todo_id: 1, todo_text: 'rowValue1' },
    { todo_id: 2, todo_text: 'rowValue2' },
    { todo_id: 3, todo_text: 'rowValue3' }
  ]);
};
