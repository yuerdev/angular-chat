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


router.post('common', (req, res, next) => {

    let result;
    switch (method) {
        case 'get': result = get(); break;
        case 'post': result = get(); break;
        case 'put': result = get(); break;
        case 'delete': result = get(); break;
    }
    if (result.data) {
        res.send({
            code: 200,
            msg: 'sucess',
            data: result.data
        })
    } else {
        res.send({
            code: 500,
            msg: 'error',
            data: result.error
        })
    }
})

function get() {

}

function convert(req) {
    let data = req.body.body.data;
    let table = req.body.table;
    let method = req.body.method;
    let limit = req.body.limit;
    let orderby = req.body.orderby;
    let where = req.body.where;
    let str = '';
    if (limit) {
        str += 'LIMIT' + limit.start + ',' + limit.number + ' ';
    }

    if (orderby) {
        orderby.forEach(ele => {
            ele = ele.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            str += 'ORDERBY' + ele + ' ';
        });
    }

    if (where) {
        if (typeof (where) == 'object') {
            for (const key in where) {
                str += `${key} = ` + where[key] + ' and'
            }
            str = str.substring(0, str.length - 4);
        } else if (typeof (where) == 'string') {
            str += where;
        }
        return str;
    }

}

router.get('/get', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // var param = req.query || req.params;

    // return db.sequelize.transaction(function (t) {
    //     return User.findOne({
    //         username: param.username,
    //         password: param.password
    //     }, {
    //             transaction: t
    //         }).then(function (result) {
    //             result = {
    //                 code: 200,
    //                 msg: 'sucess',
    //                 data: result
    //             };
    //             res.send(result);
    //         }).catch(function (err) {
    //             result = {
    //                 code: 500,
    //                 msg: 'error',
    //                 data: err
    //             };
    //             res.send(result);
    //         });
    // })

});



module.exports = router;
