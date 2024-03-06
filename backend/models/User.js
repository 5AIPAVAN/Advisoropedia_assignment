// import mongoose from 'mongoose'; // from mongoose website docs
const mongoose = require('mongoose');
const { Schema } = mongoose;



// Defining schema for storing user details
const UserSchema = new Schema({
    //  ex:-  title: String, String is shorthand for {type: String}
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    Date: {
        type: Date,
        default: Date.now
    }
});



// to use this schema in index.js need to export
// UserSchema is exported as 'user_schema'
// module.exports=mongoose.model('user_schema',UserSchema);



const User = mongoose.model('user_schema',UserSchema);
// User.createIndexes(); // TO AVOID DUPLICATE ENTRIES - based on unique key in schema i.e:- email here
// *** NO NEED OF CREATING INDEXES WHEN U ARE CHECKING(WHETHER IT IS ALREADY PRESENT) FROM DATABASE AND ADDING NEW
module.exports = User;