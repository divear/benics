const Pool = require("pg").Pool;
require("dotenv").config()

const pool = new Pool({
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: "localhost",
    port: 5432,
    database: "game_score"
});

module.exports = pool;