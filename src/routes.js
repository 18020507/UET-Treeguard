const express = require('express')
const router = express.Router();
const pool = require('../database/index.js')

const User = require('../core/user');
const Forest = require('../core/forest')
const Devices = require('../core/device')
const Devices_mess = require('../core/device_messages');
const UserInfo = require('../core/user_infor')
const generateJWT = require('./generateJWT.js');
const veryfyToken = require('./verifyToken.js');
const { route } = require('./index.js');

const user = new User();
const forest = new Forest();
const device = new Devices();
const device_mess = new Devices_mess();
const user_info = new UserInfo();

router.get('/ping', (req, res, next) => {
    res.send("pong");
})

router.get('/devices/:id', veryfyToken, (req, res, next) => {
    pool.query(`SELECT * from devices where devices.forest_id = ${req.params.id}`, function (err, result) {
        if (err) {
            return res.json({
                code: 500,
                message: err.message
            });
        }
        return res.json({code:200, data: result});
    });
})

router.get('/device_messages/:id', veryfyToken, (req, res, next) => {
    pool.query(`select * from device_messages where device_messages.id = ${req.params.id}`, function (err, result) {
        if (err) {
            return res.json({
                code: 500,
                message: err.message
            });
        }
        return res.json({code:200, data: result});
    });
})

router.get('/forest/:id', veryfyToken, (req, res, next) => {
  pool.query(`select * from forest where forest.id_Forest = ${req.params.id}`, function (err, result) {
      if (err) {
          return res.json({
              code: 500,
              message: err.message
          });
      }
      return res.json({code:200, data: result});
  });
});

router.get('/user_info/:id', veryfyToken, (req, res, next) => {
  pool.query(`SELECT * from user_infor where user_infor.id = ${req.params.id}`, function (err, result) {
    if(err) {
      return res.json({
        code:500,
        message: err.message
      });
    }
    return res.json({code:200, data: result});
  });
});


router.get('/forest/:id/users', veryfyToken, (req, res, next) => {
  pool.query(`select * from user where authority != 1 and user.forest_id = ${req.params.id}  `, function (err, result) {
      if (err) {
          return res.json({
              code: 500,
              message: err.message
          });
      }
      return res.json({code:200, data: result});
  });
})

router.get('/forest_list', veryfyToken, (req, res, next) => {
    pool.query('SELECT * from forest', function (err, result) {
        if (err)  {
            return res.json({
                code: 500,
                message: err.message
            });
        }
        return res.json({code:200, data: result});
    });
})

// Post login data
router.post('/login', (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.send({
            code: 400,
            error: 'Authenticate failed!!!',
            message: 'Missing username or password.',
        });
        return;
    }
    user.login(username, password, function (result) {
        if (result) {
            res.locals = result;
            generateJWT(req,res,next);
        } else {
            res.json({
                code: 400,
                error: 'Authenticate failed!!!',
                message: 'Username or password does not correct.',
            })
        }
    })
});

// Post register data
router.post("/register", (req, res, next) => {
    // prepare an object containing all user inputs.
    let userInput = {
      username: req.body.username,
      password: req.body.password,
      forest_id: req.body.forest_id,
    };
  
    if (req.body.password == req.body.confirmPassword) {
      user.create(userInput, function (lastId) {
        if (lastId) {
          user.find(lastId, function (result) {
            res.json({
              code: 200,
              data: {},
              message: "Create account success",
            });
          });
        } else {
          res.json({
            code: 400,
            //error: 'Authenticate failed!!!',
            message: "Create accont fail",
          });
        }
      });
    } else {
      res.send("Error creating a new user ...");
    }
  });
  
  // add forest
  router.post("/add_forest", veryfyToken, (req, res, next) => {
    // prepare an object containing all user inputs.
    let data = {
      name: req.body.name,
      district: req.body.district,
      town: req.body.town,
      province: req.body.province,
      latitude: req.body.latitude,
      longtitude: req.body.longtitude,
      size: req.body.size,
    };
  
    forest.create(data, function (callback) {
      if (callback) {
        res.json({
          code: 200,
          data: {},
          message: "successfully",
        });
      } else {
        res.json({
          code: 400,
          message: "something went wrong",
        });
      }
    });
  });
  
  router.post("/add_device", veryfyToken, (req, res, next) => {
    // prepare an object containing all user inputs.
    let data = {
      forest_id: req.body.forestId,
      device_name: req.body.name,
      latitude: req.body.latitude,
      longtitude: req.body.longtitude,
      registed_by: 1,
    };
  
    device.create(data, function (err, callback) {
      if (err) {
        res.json({
          code: 400,
          message: err.message,
        });
      } else {
        res.json({
          code: 200,
          message: callback,
          data: {}
        });
      }
    });
  });
  
  router.post("/devices_mess", veryfyToken, (req, res, next) => {
    // prepare an object containing all user inputs.
    let data = {
      device_id: req.body.device_id,
      is_stroked: req.body.is_stroked,
      is_removed: req.body.is_removed,
      is_fire: req.body.is_fire,
      power: req.body.power,
    };
  
    device_mess.create(data, function (err, callback) {
      if (err) {
        res.json({
          code: 400,
          data: {},
          message: err.message,
        });
      } else {
        res.json({
          code: 200,
          message: callback,
        });
      }
    });
  });
  
  router.get("/check-token", veryfyToken, (req, res) => {
    res.json({
      code: 200,
      data: res.locals,
    });
  });
  

  module.exports = router;
  