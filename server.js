import express from 'express';
const app = express();
// named import
import { db } from './db.js';

// require('dotenv').config();.....
import { configDotenv } from 'dotenv';
configDotenv();
// env port configuration
const PORT = process.env.PORT || 3300;
//......
// middleware body-parser (use built-in express.json)
app.use(express.json());  // object name ->  req.body

import Person from './models/person.js';
import Menuitem from './models/menuitem.js';

// middleware function for logging
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request made to:${req.originalUrl}`);
    next();
};
// apply middleware logging for all routes
app.use(logRequest);


import passport from './auth.js';
// we have to initialize also;
app.use(passport.initialize());

// ...TO home route implementing login
const localAuthMiddleare = passport.authenticate('local', { session: false });
app.get('/', localAuthMiddleare, (req, res) => {
    res.send(`Jay shree Ram... `)
})
// .....

// importing endpoints from router folder with the help of express Router
import personRoutes from './routes/personRoutes.js';
app.use("/person", personRoutes);

import menuRoutes from './routes/menuRoutes.js';
app.use('/menuitem', menuRoutes);

app.listen(PORT, () => {
    console.log(`listening on port : ${PORT}`);
}) 