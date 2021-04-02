const pool = require("../database/index");
const bcrypt = require("bcrypt");

function User_infor() {}

User_infor.prototype = {
  find: function (user = null, callback) {
    // if the user variable is defind
    if (user) {
      // if user = number return field = id, if user = string return field = email.
      var field = Number.isInteger(user) ? "id" : "last_name";
    }
    // prepare the sql query
    let sql = `SELECT * FROM user_infor WHERE ${field} = ?`;

    pool.query(sql, user, function (err, result) {
      if (err) throw err;

      if (result.length) {
        callback(result[0]);
      } else {
        callback(null);
      }
    });
  },

  create: function (body, callback) {
    var bind = [];
    // loop in the attributes of the object and push the values into the bind array.
    for (prop in body) {
      bind.push(body[prop]);
    }

    // prepare the sql query
    let sql = `INSERT INTO user_infor(id, last_name, first_name,  email, phone) VALUES (?, ?, ?, ?, ?)`;
    // call the query give it the sql string and the values (bind array)
    pool.query(sql, bind, function (err, result) {
      if (err) {
        throw err;
        //callback(false);
      }
      // return the last inserted id. if there is no error
      callback(true);
    });
  },
};

module.exports = User_infor;
