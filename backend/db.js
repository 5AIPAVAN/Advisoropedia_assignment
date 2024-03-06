require('dotenv').config();
const mongoose = require('mongoose');
const mongo=process.env.mongoURI;

const connectToMongo = () =>{

       mongoose.connect(mongo).then(()=>console.log("CONNECTED TO MONGODB SUCCESSFULLY "))
       .catch((err)=>{console.log("SOME ERR OCCURED IN MONGO CONNECTION :"+err)})
}


module.exports = connectToMongo;

