/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("todo", (table) => {
        table.increments("todo_id");
        table.text("todo_text");
    }).createTable("inprogress", (table) => {
        table.increments("inprogress_id");
        table.text("inprogress_text");
    }).createTable("done", (table) => {
        table.increments("done_id");
        table.text("done_text");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("done")
        .dropTableIfExists("inprogress")
        .dropTableIfExists("todo");
};
