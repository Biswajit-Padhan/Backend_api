const{Sequelize}=require('sequelize')
require('dotenv').config();

const sequelize=new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASS,{
host:process.env.DB_HOST,
dialect:process.env.DB_DIALECT,


});

async function ConnectDB(){
    try{
        await sequelize.authenticate();
        console.log("database connected.....");
        
    }catch(err){
console.log("database not connected :",err);

    }
}

ConnectDB();

module.exports=sequelize;