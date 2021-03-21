const util = require('util');
const { createPool } = require('mysql')

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "anhvahieu2k",
    database: "tree_guard_uet",
    connectionLimit: 10
});

pool.getConnection((err, connection) => {
    if(err) 
        console.error("Something went wrong connecting to the database ...");
    else if (connection) {
        console.log("success")
        connection.release();
    }
    return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;
