const express=require('express');
const sequelize=require('./config/db');
const cors=require('cors')
const User=require('./models/usermodel');
require('dotenv').config();
// const protectroute=require('./routes/authroutes')


const app=express();
app.use(cors({
    origin: "http://localhost:5173",  // ✅ Adjust this to match your frontend URL
    credentials: true,  // ✅ Allow cookies/auth headers
    methods: ["GET", "POST", "PUT", "DELETE"], // ✅ Allow specific HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"] // ✅ Allow necessary headers
}));
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