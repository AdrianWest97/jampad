"use strict";


const mongoose = require('mongoose');
// const path = require('path');
// require('dotenv').config({path: path.resolve(__dirname + '.env')})
// let file = require('dotenv').config({path: path.resolve(__dirname + '/.env')});
// const mode = process.env.APP_ENV
// const dbname = process.env.DB_NAME;
// const dbpass = process.env.DB_PASSWORD;
// const dbuser = process.env.DB_USER;
// const dbhost =   mode === 'development' ? process.env.DB_HOST_DEV :  process.env.DB_HOST_PROD;
// const dbport = mode === 'development' ? process.env.DB_PORT_DEV : process.env.DB_HOST_PROD;
// const dbauth = process.env.DB_AUTHSOURCE;

//establish connection
let timeout = 1000 * 5;
let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex:true
}

const connection_string =  `mongodb://localhost:27017/noteone`

const connect = async () => {
    try {   
        console.log("Connection established");
        await mongoose.connect(connection_string, options)
    } catch (error) {
        console.log("Unable to connect");
        setTimeout(connect, timeout)
    }
}

module.exports = connect