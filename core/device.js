const pool = require("../database/index");

function Devices() {}

Devices.prototype = {
  create: function (body, callback) {
    // this array will contain the values of the fields.
    var bind = [];
    for (prop in body) {
      bind.push(body[prop]);
    }
    // prepare the sql query
    let sql = `INSERT INTO devices(forest_id, device_name, latitude, longtitude, registed_by) VALUES (?, ?, ?, ?, ?)`;

    pool.query(sql, bind, function (err, result) {
      // return the last inserted id. if there is no error
      
      callback(err, (result || {}).insertId);
    });
  },
};

module.exports = Devices;
