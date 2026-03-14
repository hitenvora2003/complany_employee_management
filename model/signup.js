const mongoose = require('mongoose');
const usershcema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter your name']
    },
    email: {
        type: String,
        required: [true, 'Enter your Emailid'],
        unique: [true, 'Email already exists. Please use a different one.']
    },
    password: {
        type: String,
        required : [true, 'Plaese enter your password'],
        minlength: [6, 'Password must be at least 6 characters long'],

    }
})
module.exports = mongoose.model('signup', usershcema)