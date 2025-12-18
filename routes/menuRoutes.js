import express from 'express';
import menuitem from '../models/menuitem.js';
const router = express.Router();
// menuItem start----
router.post('/', async (req, res) => {
    try {
        const Menu = req.body;
        const newMenu = new menuitem(Menu);
        const response = await newMenu.save();
        console.log(`menu data saved`, response);
        res.status(201).json({ response });
    } catch (err) {
        console.log(err);
        res.status(501).json({ error: "Internal server error while saving MenuItem data" });
    }
})
router.get("/", async (req, res) => {
    try {
        const menudata = await menuitem.find();
        res.status(200).json(menudata);
    } catch (err) {
        console.log(err);
        res.status(501).json({ error: "internal server error while geting menu items:" });
    }
})
// menuItem end----

// parameterized menu endpoint for taste
router.get('/:tastetype', async (req, res) => {
    try {
        const tastetype = req.params.tastetype;
        if (tastetype == 'sweet' || tastetype == 'sour' || tastetype == 'spicy') {
            const tastedataresponse = await menuitem.find({ taste: tastetype });
            //work is enum variable define in menuitem schema
            console.log(`response fetched`);
            res.status(203).json(tastedataresponse);
        } else {
            res.send(404).json({ error: "Item not found " });
        }
    } catch (err) {
        console.log(err);
        res.status(505).json({ error: "internal server error" });
    }
})


// put method to update menu item of the lis tlklkjfasdjlk
router.put('/:id', async (req, res) => {
    try {
        const menuitemid = req.params.id;
        const updatemenuitemData = req.body;
        const response = await menuitem.findByIdAndUpdate(menuitemid, updatemenuitemData, {
            new: true,
            runValidators: true,
        })

        if (!response) {
            return res.status(404).json({ error: "Menu not foundS" });
        }
        console.log('data updatred');
        res.status(202).json(response);

    } catch (error) {
        console.log(error);
        res.status(505).json({ error: "Internal Server Error" });
    }
});

// put routes for menuitem end......

// menu delete route start..........

router.delete('/:id', async (req, res) => {
    try {
        const menuitem_id = req.params.id;
        const response = await menuitem.findByIdAndDelete(menuitem_id);
        if (!response) {
            return res.status(404).json({ error: "menu item not found" })
        }
        console.log("item deleted");
        res.status(200).json({ message: "deleted successfully"});

    } catch (err) {
        console.log(err);
        res.status(506).json({ error: "internal server error" });
    }
})
// menuitem deleted.....


export default router;