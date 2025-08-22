module.exports = {
    development: {
        client: "pg",
        connection: {
            database: "kanbanboard",
            user: "postgres",
            password: "i.nur0806",
        },
    },
    migrations: {
        directory: "./data/migrations",
    },
    seeds: {
        direction: "./data/seeds",
    },
    production: {}
}