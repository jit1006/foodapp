import express from 'express';

import Person from './models/person.js';

// ....implementing passport...
import passport, { Passport } from 'passport';

// ....local strategy .ie username and passport way we will use..
import LocalStrategy from 'passport-local';


passport.use(new LocalStrategy(async (USERNAME, password, done) => {
    // authentication logic
    try {
        // console.log(`Received credentials:`, USERNAME, password);
        const user = await Person.findOne({ username: USERNAME });
        if (!user) {
            return done(null, false, { message: "user not found" });
        }

        const ispassword = await user.comparePassword(password); //comparePassword is a method defiend below
        if (ispassword) {
            return done(null, user);
        }
        else {
            return done(null, false, { message: "incorrect password" });
        }
    } catch (err) {
        return done(err);
    }
}));

export default passport;
