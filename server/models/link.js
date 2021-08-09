const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true
    },
    shortLink: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    userId: {
        type: 'ObjectId',
        required: true
    }  
});

const Link = mongoose.model('link', linkSchema);
module.exports = Link;