"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema

let noteSchema = new Schema({
    note:String,
    title:String,
    color:String,
    completed:Boolean,
    user:{type:Schema.Types.ObjectId, ref:"User", required:true}
})

let note = mongoose.model("Note", noteSchema);
module.exports = note;
