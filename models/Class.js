const mongoose = require('mongoose');

const ClassListSchema = new mongoose.Schema({
name: {
    type: String,
    required: true
},
classDate: {
    type: String,
    required: true
},
date: {
    type: Date,
    default: Date.now
},
rate: {
    type: String,
    required: true
},
topic: {
    type: String,
    required: true
},
pros: {
    type: String,
    required: true
},
cons: {
    type: String,
    required: true
},
homework: {
    type: String,
    required: true
},
paid: {
    type: Boolean,
    default: false
},
user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
},
files: {
    type: [String],
    required: false
},
cloudinaryId: {
    type: [String],
    required: false
}
})

module.exports = mongoose.model('classlist',ClassListSchema,'classes');