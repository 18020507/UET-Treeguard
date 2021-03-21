const pool = require('../database/index');

function forest() {};

forest.prototype = {
    create : function(body, callback) 
    {
        // this array will contain the values of the fields.
        var bind = [];  
        for(prop in body){
            bind.push(body[prop]);
        }
        // prepare the sql query
        let sql = `INSERT INTO forest(name, district, town, province, latitude_BL, longtitude_BL, latitude_TL, longtitude_TL,
            latitude_BR, longtitude_BR, size) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        pool.query(sql, bind, function(err, result) {
            if(err) throw err;
            // return the last inserted id. if there is no error
            callback(result.insertId);
        });
    },
}

module.exports = forest;