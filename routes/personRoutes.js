import express from 'express';
// import express, { response } from 'express';

const router = express.Router();  // jis variable ser router ko import karoge usi ko export karoge

import { jwtAuthMiddleware, generateToken } from "./../jwt.js";


import Person from './../models/person.js';
// person start------
// async and await is used
router.post('/signup', async (req, res) => {
    try {
        const data = req.body;
        //  create a new person document using the mongoose model
        const newPerson = new Person(data);
        const response = await newPerson.save()
        console.log(`Data saved`, response);

        //jwt imple 
        const payload = {
            id: response.id,
            username: response.username
        }
        const token = generateToken(payload);
        console.log("Token is :", token);
        res.status(200).json({ response: response, token: token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error while saving person data" });
    }
})

//login route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        //find the user by username;
        const user = await Person.findOne({ username: username });

        // if user does not ext or password does not match,return error
        if (!user || !await user.comparePassword(password)) {
            return res.status(404).json({ error: "Envalied username or password" });
        }

        // genrate token
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload);
        // return token as response
        res.json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" });
    }
})
//...

router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        const userData = req.user;//jwtAuthMiddleware send response (user)
        console.log(userData);
        const userId = userData.id;
        const user = await Person.findById(userId);
        res.status(202).json({ user });
    } catch (err) {
        console.log(err);
        res.status(404).json({ error: "Internal server Error" });
    }
})




// to get persons details from database---
router.get('/', jwtAuthMiddleware, async (req, res) => {
    try {
        const data = await Person.find();
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error while saving person data" });
    }
})
//end -------


// fetch detels by worktype by using parameterized url
router.get('/:worktype', async (req, res) => {
    try {
        const worktype = req.params.worktype;//Extract work type from url;
        if (worktype == 'chef' || worktype == 'manager' || worktype == 'waiter') {
            const response = await Person.find({ work: worktype });//work is enum variable define in person schema
            console.log(`response fetched`);
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: "invalid work type" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server error" });
    }
})

// using PUT method to update user data

router.put('/:id', async (req, res) => {
    try {
        const person_id = req.params.id; //getting unique id from the URL parameter
        const updatePersonData = req.body; //getting person update json data from the the body 
        const response = await Person.findByIdAndUpdate(person_id, updatePersonData, {
            new: true,
            runValidators: true,
        })

        if (!response) {
            return res.status(404).json({ error: "person not found" });
        }
        console.log('data updated');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" });
    }
});

// ------end


// Delete Person By Id.....
router.delete('/:id', async (req, res) => {
    try {
        const PersonId = req.params.id;
        const response = await Person.findByIdAndDelete(PersonId);
        if (!PersonId) {
            return res.status(404).json({ message: "Person Not Found" });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

export default router;
