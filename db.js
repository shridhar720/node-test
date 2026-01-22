// const mongoose = require("mongoose")
import mongoose from 'mongoose';
import 'dotenv/config'

// import mongoose from 'express'
// const express = require('express')


//define mongo db connection 
// const mongoURL  = 'mongodb://localhost:27017/hotel'
// const mongoURL  = 'mongodb+srv://shridharbhinge_db_user:User1234@cluster0.ws2yrsh.mongodb.net/'
const mongoURL = process.env.DB_URL

// mongo db connection
mongoose.connect(mongoURL,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection;

db.on('connected',() =>{
    console.log('connected with Mongo DB');
});

db.on('error',(err) =>{
    console.log('connection Error', err);
});

db.on('disconnected',() =>{
    console.log('Disconnected with Mongo DB');
})

// export DB conection to main js file 
// module.exports = db;
export default db;
