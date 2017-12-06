var express = require('express');
var router = express.Router();

var http = require('http').Server(express());
var io = require('socket.io')(http);

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
      console.log('message: ' + msg);
      io.emit('chat message', msg);
    });
    socket.on('private message', function (from, msg) {
      console.log('I received a private message by ', from, ' saying ', msg);
    });
    console.info(socket);
  });

  // let __dirname='../';
/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Expre-ss' });
  // res.render();
  console.info('-----');
  res.sendFile(__dirname+'/dist/index.html')
});

module.exports = router;
