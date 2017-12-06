'use strict'

var all = {
    sequelize:{
        username: 'root',
        password: 'hh108115',
        database: 'chat',
        host: "104.238.135.128",
        dialect: 'mysql',
        define: {
            underscored: false,
            timestamps: true,
            paranoid: true
        }
    }
};

module.exports = all;