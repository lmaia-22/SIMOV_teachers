const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : { type: String, required: true },
    email: {
        type: String, 
        required: true, 
        useCreateIndex: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    degree: { type: String, required: true },
    field: { type: String, required: true },
    cost: { type: Number, required: true },
    subjects: { type: Array, required: true },
    location: {type: String, required: true}
});

module.exports = mongoose.model('Teacher', teacherSchema);