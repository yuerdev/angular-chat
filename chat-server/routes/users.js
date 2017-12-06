var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


var db = require('../sqldb');
var User=db.User;
router.post('/register', function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  var param = req.body;
  return db.sequelize.transaction(function (t) {
    return User.create({
      username:param.username,
      password:param.password
    }, {
        transaction: t
      }).then(function (result) {
        result = {
          code: 200,
          msg: 'sucess',
          data: result
        };
        res.send(result);
      }).catch(function (err) {
        result = {
          code: 500,
          msg: 'error',
          data: err
        };
        res.send(result);
      });
  })
});

var MSG = db.Message;
router.get('/queryMessage', function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  var param = req.query || req.params;
  return db.sequelize.transaction(function (t) {
    return MSG.findAll({
      room_id: param.room_id,
      order: [
        ["date", "ASC"]   //按名字降序排列
    ]

    }, {
        transaction: t
      }).then(function (result) {
        result = {
          code: 200,
          msg: 'sucess',
          data: result
        };
        res.send(result);
      }).catch(function (err) {
        result = {
          code: 500,
          msg: 'error',
          data: err
        };
        res.send(result);
      });
  })
});

var Room = db.Room;
router.get('/getRoomList', function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // var param = req.query || req.params;
  return db.sequelize.transaction(function (t) {
    return Room.findAll({
      // room_id: param.room_id,
      active: 1
    }, {
        transaction: t
      }).then(function (result) {
        result = {
          code: 200,
          msg: 'sucess',
          data: result
        };
        res.send(result);
      }).catch(function (err) {
        result = {
          code: 500,
          msg: 'error',
          data: err
        };
        res.send(result);
      });
  })
});

module.exports = router;
