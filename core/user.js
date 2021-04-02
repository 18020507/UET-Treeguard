const pool = require("../database/index");
const bcrypt = require("bcrypt");

function User() {}
console.log(bcrypt.hashSync("user", 10))
User.prototype = {
  // Find the user data by id or email.
  find: function (user = null, callback) {
    // if the user variable is defind
    if (user) {
      // if user = number return field = id, if user = string return field = email.
      var field = Number.isInteger(user) ? "id" : "username";
    }
    // prepare the sql query
    let sql = `SELECT * FROM user WHERE ${field} = ?`;

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
    var pwd = body.password;
    // Hash the password before insert it into the database.
    body.password = bcrypt.hashSync(pwd, 10);
    // this array will contain the values of the fields.
    var bind = [];
    // loop in the attributes of the object and push the values into the bind array.
    for (prop in body) {
      bind.push(body[prop]);
    }
    // prepare the sql query
    let sql = `INSERT INTO user(username, password, forest_id, authority) VALUES (?, ?, ?, 2)`;
    // call the query give it the sql string and the values (bind array)
    pool.query(sql, bind, function (err, result) {
      if (err) throw err;
      // return the last inserted id. if there is no error
      callback(result.insertId);
    });
  },

  login: function (username, password, callback) {
    // find the user data by his email.
    this.find(username, function (user) {
      // if there is a user by this email.
      if (user) {
        // now we check his password.
        if (bcrypt.compareSync(password, user.password)) {
          // return his data.
          delete user.password;
          callback(user);
          return;
        }
      }
      // if the email/password is wrong then return null.
      callback(null);
    });
  },
};

module.exports = User;
