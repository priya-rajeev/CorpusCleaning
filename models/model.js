const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    thread_id: {
        required: true,
        type: String
    },
    sentence: {
        required: true,
        type: String
    },
    reviewer_id: {
        required: true,
        type: String
    },
    sentence_seg: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('data', dataSchema)