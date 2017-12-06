'use strict'

var config = require('../config');
var Sequelize = require('sequelize');
var db = {
    sequelize:new Sequelize(config.sequelize.database,config.sequelize.username,config.sequelize.password,config.sequelize)
};
db.User = db.sequelize.import('../model/user.js');
db.Message = db.sequelize.import('../model/message.js');
db.Room = db.sequelize.import('../model/room.js');
module.exports = db;