"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema

let userSchema = new Schema({
    username:{
        type:String,
         required:[true, "Username is required"], 
         trim:true, minlength:[4, "Username can't be shorter than 4 characters"],
         lowercase: true,
        },
    password:{type:String, required:[true,"Password is required"],  minlength:[4, "Password too short"]},
    email:{
        type:String, 
        required:[true, 'Please provide a valid email'],
        trim:true,
        lowercase: true,
        index:{
            unique:true
        },
        minlength:[6, "Email can't be shorter than 6 characters"]
    },
    // notes:[{type:Schema.Types.ObjectId, ref:"Note"}]
})

let User = mongoose.model('User',userSchema);
module.exports = User