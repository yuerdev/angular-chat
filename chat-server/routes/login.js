var express = require('express');
var router = express.Router();
var mysql = require('mysql');

// 响应一个JSON数据
var responseJSON = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '-200', msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

var db = require('../sqldb');
var User = db.User;
db.sequelize.sync();
router.get('/', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var param = req.query || req.params;
    return db.sequelize.transaction(function (t) {
        return User.findOne({
            username: param.username,
            password: param.password
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
