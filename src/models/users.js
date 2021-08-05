const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    city:{
        type:String,
        required:true,
        trim:true
    },
    field:{
        type:String,    
        required:true,
        trim:true
    },
})
//we are creating anew collection
const users = new mongoose.model('users',usersSchema)

module.exports = users;