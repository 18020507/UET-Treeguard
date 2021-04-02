const util = require('util');
const { createPool } = require('mysql');
require("dotenv").config();

const pool = createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectionLimit: 10
});

pool.getConnection((err, connection) => {
    if(err) {
        console.error(" went wrong connecting to the database ...");
        console.log(err);
    }
    else if (connection) {
        console.log("connect db success");
        connection.release();
    }
    return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;
