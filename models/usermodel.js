const{DataTypes}=require('sequelize');
const sequelize=require('../config/db')

const User=sequelize.define('User',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true

    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
        validate:{
            isEmail:true,
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        
    },
    fullname:{
        type:DataTypes.STRING,
        allowNull:false,
    },
},{
    timestamps:true,
}
);


module.exports=User;