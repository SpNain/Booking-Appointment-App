const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const userDetails = sequelize.define('userDetails',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true,
        unique:true
    },
    userName:{
        type: Sequelize.STRING,
        allowNull :false
    },
    userEmail:{
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    userPhone:{
        type: Sequelize.BIGINT,
        allowNull:false,
    },
    userDate:{
        type: Sequelize.DATEONLY,
        allowNull:false
    }
});

module.exports=userDetails;