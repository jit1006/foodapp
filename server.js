import express from 'express';
const app = express();

// default import
// import  db  from './db.js'; 

// named import
import { db } from './db.js';

// require('dotenv').config();
import { configDotenv } from 'dotenv';
configDotenv();



// -----
// app.use(express.json());  // object name ->  req.body
// import Person from './models/person.js';
// ------older method



// middleware body-parser (use built-in express.json)
app.use(express.json());  // object name ->  req.body


// import Person from './models/person.js';
import Menuitem from './models/menuitem.js';

// env port configuration
const PORT = process.env.PORT || 3300;

app.get('/', (req, res) => {
    res.send(`I am back bro... `)

})


// app.post('/person',(req, res) => {

// this method is nomore used.Insted of callback method we use async and await

// const data = req.body;

// //  create a new person document using the mongoose model
// const newPerson = new Person(data);

// //  save the new person to the database
// newPerson.save((error, savedperson) => {
//     if (error) {
//         console.log(`Error saving person: `, error);
//     } else {
//         console.log(`data saved successfully`);
//         res.status(200).json(savedperson);
//     }
// })

// })




//lecture 1----- 
// app.get('/chicken', (req, res) => {
//     res.send("checken khao mast rho")
// })
// app.get('/idli', (req, res) => {
//     const newIdli = {
//         name: "rampur idli",
//         size: 'XL',
//         is_sambhar: true
//     }
//     res.send(newIdli);
// })



// importing endpoints from router folder with the help of express Router
import personRoutes from './routes/personRoutes.js';
app.use("/person", personRoutes);

import menuRoutes from './routes/menuRoutes.js';
app.use('/menuitem', menuRoutes);


app.listen(PORT, () => {
    console.log(`listening on port : ${PORT}`);
}) 