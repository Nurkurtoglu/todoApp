const db = require("./db-config");

module.exports = {
    findTodo,
    findTodoById,
    addTodo,
    deleteTodo,
    updatedTodo,
    findInprogress,
    findInprogressById,
    addInprogress,
    deleteInprogress,
    findDone,
    findDoneById,
    addDone,
    deleteDone,
}

async function findTodo() {
    return await db("todo");
}

async function findTodoById(id) {
    return await db("todo").where({ todo_id: id }).first();
}

async function addTodo(newTodo) {

    const inserted = await db("todo").insert(newTodo, "todo_id");
    const todo_id = inserted[0].todo_id;
    return await db("todo").where({ todo_id }).first();
}
async function updatedTodo(updateTodo, id) {
    const updated = await db("todo").update(updateTodo).where({ todo_id: id });
    if (updated) {
        return await db("todo").where({ todo_id: id }).first();
    }
}

async function deleteTodo(id) {
    return await db("todo").del().where({ todo_id: id });
}


// inprogress kısmı

async function findInprogress() {
    return await db("inprogress");
}

async function findInprogressById(id) {
    return await db("inprogress").where({ inprogress_id: id }).first();
}


async function addInprogress(newInprogress) {

    const inserted = await db("inprogress").insert(newInprogress, "inprogress_id");
    const inprogress_id = inserted[0].inprogress_id;
    return await db("inprogress").where({ inprogress_id }).first();

}


async function deleteInprogress(id) {
    return await db("inprogress").del().where({ inprogress_id: id });
}


// done kısmı

async function findDone() {
    return await db("done");
}

async function findDoneById(id) {
    return await db("done").where({ done_id: id }).first();
}


async function addDone(newDone) {
    const inserted = await db("done").insert(newDone, "done_id");
    const done_id = inserted[0].done_id;
    return await db("done").where({ done_id }).first();
}

async function deleteDone(id) {
    return await db("done").del().where({ done_id: id });
}