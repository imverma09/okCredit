const mongoose = require('mongoose')
 
const schema =  mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'name is required again'],   
    },
    email: {
        type: String,
        required: [true, 'email is required again'],
        unique:[true, 'email must be unique']
    },
    lastName: {
        type: String,
    },
    password: {
        type: String,
        require: [true, "Enter a strong Password ! "]
    },
})

module.exports = mongoose.model('user', schema )