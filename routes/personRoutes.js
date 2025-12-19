import express, { response } from 'express';

const router = express.Router();  // jis variable ser router ko import karoge usi ko export karoge

import Person from './../models/person.js';

// person start------
// async and await is used
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        //  create a new person document using the mongoose model
        const newPerson = new Person(data);
        const response = await newPerson.save()
        console.log(`Data saved`, response);
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error while saving person data" });
    }
})
// to get persons details from database---
router.get('/', async (req, res) => {
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
            res.status(203).json(response);
        } else {
            res.status(404).json({ error: "invalid work type" });
        }
    } catch (err) {
        console.log(err);
        res.send(5003).json({ error: "Internal Server error" });
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
        res.status(506).json({ error: "internal server error" });
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
        res.status(506).json({ error: "Internal Server Error" });
    }
})

export default router;
