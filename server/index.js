const express = require("express");
const cors = require("cors")
const logger = require("./middlewares/logger");
const errorHandling = require("./middlewares/errorHandling");
const todo = require("./data/data-model");
const inprogress = require("./data/data-model");
const done = require("./data/data-model");

const server = express();
server.use(express.json());
server.use(logger);
server.use(cors());


server.get("/", (req, res) => {
    res.send("expressten merhaba.")
})

server.get("/todo", async (req, res, next) => {
    try {
        const result = await todo.findTodo();
        if (result) {
            res.status(200).json(result);
        }
        else {
            next({ statusCode: 404, errorMessage: "Veriler bulunamadi." });
        }
    } catch (err) {
        next(err);
    }
});


server.post("/todo", async (req, res, next) => {
    try {
        const newTodo = req.body;
        console.log("POST ile gelen veri:", newTodo);

        if (newTodo.todo_text) {
            const result = await todo.addTodo(newTodo);

            console.log(result);
            return res.status(201).json(result);
        } else {
            next({
                statusCode: 400,
                errorMessage: "Todo eklemek icin veri girmelisiniz.",
            });
        }
    } catch (err) {
        console.error("Hata oluştu:", err);
        next(err);
    }
});


server.patch("/todo/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const updateTodo = req.body;

        if (updateTodo) {
            const updated = await todo.updatedTodo(updateTodo, id);
            return res.status(200).json(updated);
        }
    } catch (error) {
        next({
            statusCode: 500,
            errorMessage: "Aktor duzenlenirken hata olustu.",
            error,
        });
    }
})


server.delete("/todo/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);

        const deletedData = await todo.findTodoById(id);
        if (deletedData) {
            const deleted = await todo.deleteTodo(id);
            if (deleted) {
                return res.status(204).end();
            }
        }

        next({
            statusCode: 400,
            errorMessage: "Silmeye calistiginiz todo sistemde mevcut degil.",
        });
    } catch (error) {
        next({
            statusCode: 500,
            errorMessage: "Todo silinirken hata olustu.",
            error,
        });
    }
});


// inprogress kısmı 

server.get("/inprogress", async (req, res, next) => {

    try {

        const result = await inprogress.findInprogress();
        if (result) {
            res.status(200).json(result);
        } else {
            next({ statusCode: 404, errorMessage: "Veriler bulunamadi." });
        }

    } catch (err) {
        next(err)
    }
});

server.post("/inprogress", async (req, res, next) => {
    try {
        const newInprogress = req.body;

        if (newInprogress.inprogress_text) {
            const result = await inprogress.addInprogress(newInprogress);
            console.log(result);
            return res.status(201).json(result);
        } else {
            next({
                statusCode: 400,
                errorMessage: "Todo eklemek icin veri girmelisiniz.",
            });
        }

    } catch (err) {
        console.error("Hata oluştu:", err);
        next(err);
    }
});


server.delete("/inprogress/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const deletedData = await inprogress.findInprogressById(id);
        if (deletedData) {
            const deleted = await inprogress.deleteInprogress(id);
            if (deleted) {
                return res.status(204).end();
            }
        }

        next({
            statusCode: 400,
            errorMessage: "Silmeye calistiginiz todo sistemde mevcut degil.",
        });

    } catch (err) {
        next({
            statusCode: 500,
            errorMessage: "Todo silinirken hata olustu.",
            err,
        });
    }
});


// done kısmı

server.get("/done", async (req, res, next) => {
    try {
        const result = await done.findDone();
        if (result) {
            res.status(200).json(result);
        } else {
            next({ statusCode: 404, errorMessage: "Veriler bulunamadi." });
        }

    } catch (err) {
        next(err);
    }
});

server.post("/done", async (req, res, next) => {
    try {
        const newDone = req.body;

        if (newDone.done_text) {
            const result = await done.addDone(newDone);
            console.log(result);
            return res.status(201).json(result);

        } else {
            next({
                statusCode: 400,
                errorMessage: "Done eklemek icin veri girmelisiniz.",
            });
        }
    } catch (err) {
        next(err);
    }
});

server.delete("/done/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const deletedData = await done.findDoneById(id);
        if (deletedData) {
            const deleted = await done.deleteDone(id);
            if (deleted) {
                return res.status(204).end();
            }
        }
        next({
            statusCode: 400,
            errorMessage: "Silmeye calistiginiz done sistemde mevcut degil.",
        });

    } catch (err) {
        next({
            statusCode: 500,
            errorMessage: "Done silinirken hata olustu.",
            err,
        });
    }
});



server.use(errorHandling);

server.listen(5000, () => {
    console.log("http://localhost:5000 adresine gelen istekler dinleniyor ...");

})