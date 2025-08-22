/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('inprogress').del()
  await knex('inprogress').insert([
    { inprogress_id: 1, inprogress_text: 'rowValue1' },
    { inprogress_id: 2, inprogress_text: 'rowValue2' },
    { inprogress_id: 3, inprogress_text: 'rowValue3' }
  ]);
};
