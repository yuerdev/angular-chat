var io = require('socket.io')();
// var xssEscape = require('xss-escape');
var _ = require('lodash');
// var dbConfig = require('../db/DBConfig');

// 使用DBConfig.js的配置信息创建一个MySQL连接池
// var pool = mysql.createPool(dbConfig.mysql);
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

var nickname_list = [];

function HasNickname(_nickname) {
    for (var i = 0; i < nickname_list.length; i++) {
        if (nickname_list[i] == _nickname) {
            return true;
        }
    }
    return false;
}

function RemoveNickname(name) {
    for (var i = 0; i < nickname_list.length; i++) {
        if (nickname_list[i].username == name)
            nickname_list.splice(i, 1);
    }
}


var db = require('./sqldb');
var MSG=db.Message;
function SaveMessage(message) {
   return db.sequelize.transaction(function(t){
        return MSG.create(message,{
            transaction:t
        }).then(function(result){
            // res.send(result);
            console.info('保存成功');
        }).catch(function(err){
            console.log("发生错误：" + err);
        });
    })

}

io.on('connection', function (_socket) {
    console.log(_socket.id + ': connection');
    let room_id;
    _socket.on('join', function (param) {
        _socket.name = param.username;
        let username=param.username;
         sroom_id=param.room_id;
        _socket.join(room_id);
        if (!_.find(nickname_list, { username: _socket.name })) {
            nickname_list.push({ username: _socket.name, id: _socket.id });
        }
        console.info('---', _socket.name);
        _socket.emit('connet', { id: _socket.id, name: _socket.name });
        _socket.emit('user_list', nickname_list);
    })

    _socket.on('disconnect', function () {
        console.log(_socket.name + ': disconnect');
        if (_socket.name != null && _socket.name != "") {
            _socket.broadcast.emit('user_quit', _socket.name);
            RemoveNickname(_socket.name);
        }
    });

    _socket.on('say', function (msg) {
        SaveMessage(msg);
        console.log(msg.send_id + ': say(' + msg.text + ')');
        _socket.to(room_id).emit('room_message',msg);
        // _socket.nsp.to(room_id).emit('room_message',user_id,_content)
    });
});


exports.listen = function (_server) {
    return io.listen(_server);
};

// db.sequelize.sync().then(function(result){
//     // 同步了'Role'、'UserRole'、'UserRole'三个模型
//   })