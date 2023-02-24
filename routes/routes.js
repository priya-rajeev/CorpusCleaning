const express = require('express');
const router = express.Router()
const Model = require('../models/model');

module.exports = router;

router.post('/post', async (req, res) => {
    const data = new Model({
        thread_id: req.body.thread_id,
        sentence: req.body.sentence,
        reviewer_id: req.body.reviewer_id,
        sentence_segmentation: req.body.sentence_segmentation
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get all Method
router.get('/getAll', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true,
                          omitUndefined:true };

        const result = await Model.findByIdAndUpdate(
            id, {$set: updatedData}, options
        )

        res.send(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndRemove(id);
        res.send(JSON.stringify(`Document with ${data.name} has been deleted..`));
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

