const pool = require('../database/index');

function Devices() {};

Devices.prototype = {
    create : function(body, callback) 
    {
        // this array will contain the values of the fields.
        var bind = [];  
        for(prop in body){
            bind.push(body[prop]);
        }
        // prepare the sql query
        let sql = `INSERT INTO devices(forest_id, device_name, latitude, longtitude, registed_by, maintenence) VALUES (?, ?, ?, ?, ?, ?)`;

        pool.query(sql, bind, function(err, result) {
            if(err) throw err;
            // return the last inserted id. if there is no error
            callback(result.insertId);
        });
    },
}

module.exports = Devices;