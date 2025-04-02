const express=require('express');
const sequelize=require('./config/db');

const User=require('./models/usermodel');
require('dotenv').config();
// const protectroute=require('./routes/authroutes')


const app=express();
app.use(express.json());

async function syncDatabase(){
    try{
        await sequelize.sync({force:false});
        console.log('Database synced successfully');
    }catch(err){
        console.log('Error syncing database:',err);
    }
}
syncDatabase();

const authrouter=require('./routes/authrouters')
app.use('/api/auth',authrouter);

// app.use('/api/auth',protectroute)

const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})