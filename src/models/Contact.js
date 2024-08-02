const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    }, 
    phone:{
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default:Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require:true
    }
})


const Contact = mongoose.model('Contact', ContactSchema)

module.exports = Contact;