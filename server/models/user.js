const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLenght: 6,
    },
});


const User = mongoose.model('user', userSchema);
module.exports = User;