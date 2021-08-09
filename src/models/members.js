const mongoose = require('mongoose');

const membersSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    password:{
        type:String,    
        required:true,
        trim:true
    },
})
//we are creating anew collection
const members = new mongoose.model('members',membersSchema)

module.exports = members;