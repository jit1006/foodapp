
import bcrypt from "bcrypt";

import mongoose from "mongoose";

// persion schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

personSchema.pre('save', async function (next) {
    const person = this;//for any this pre middle ware call
    //hash tha password only if it has been modified;
    if (!person.isModified('password')) return;
    try {
        //hash password generation
        const salt = await bcrypt.genSalt(10);

        //hash password 
        const hashPassword = await bcrypt.hash(person.password, salt);
        // override the plain password with the hashed one
        person.password = hashPassword;
        // next();
    } catch (err) {
        // next(err);
        throw err;
    }
})

personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        // use bcrypt to compare the provided password with hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch
    } catch (err) {
        throw (err);
    }
};

// create person model
const Person = mongoose.model('Person', personSchema);
export default Person;

