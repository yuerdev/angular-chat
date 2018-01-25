'use strict'
module.exports = function(sequelize,DataTypes){
    var Message = sequelize.define('message',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement: true 
        },
        send_id:{
            type:DataTypes.INTEGER
        },
        receive_id:{
            type:DataTypes.INTEGER
        },
        room_id:{
            type:DataTypes.STRING
        },
        date:{
            type:DataTypes.DATE,
            defaultValue: DataTypes.NOW, 
        },
        // sys_message:{
        //     type:DataTypes.INT
        // },
        text:{
            type:DataTypes.TEXT 
        }
    },{
        freezeTableName: true,
         timestamps: false     
    });
    // sequelize.sync();
    return Message;
};
