"use strict";

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors')
var logger = require('morgan');
require('dotenv').config()


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let connect = require('./connection');

var app = express();
app.use(cors())


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

(async() => {
    await connect();
    // try{
    // let User = require('./models/user');
    // let user = await  User.create({username:"",email:"skd433", password:"92338383"});
    // console.log("user created");

    // }catch(err){
    //     if(err) {
    //         if (err.name === 'ValidationError') {
    //           console.error(Object.values(err.errors).map(val => val.message))
    //         }else{
    //             console.log("Something went wrong")
    //         }
    //       }
    // }
})();

module.exports = app;
