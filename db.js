import mongoose from 'mongoose';


// import and config the dot env module
import { configDotenv } from 'dotenv';
configDotenv();

// require('dotenv').config();

// cloud db
// const mongoURL = "mongodb+srv://guddujitendrarana_db_user:Rana123@clustereventomems.v6fffaq.mongodb.net/foodapp";
// local db url 
// const mongoURL = 'mongodb://localhost:3000/foodapp'

const mongoURL = process.env.mongoDB;    // cloud based url
// const mongoURL = process.env.mongolocal;  // to run locally
mongoose.connect(mongoURL);


const db = mongoose.connection;


// database event listerner
db.on('connected', () => {
    console.log(`connected to server`);
});

db.on('error', (err) => {
    console.error('error to server:', err);
});

db.on('disconnected', () => {
    console.log(`server disconnected`);
});

// named Export the db
export { db };

