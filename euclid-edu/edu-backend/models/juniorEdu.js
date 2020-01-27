const mongoose = require('mongoose');

const {Schema} = mongoose;

const JuniorEduSchema = new Schema({
    timestamp: Date,
    name: String,
    birthday: String,
    school: String,
    // class: String,
    // phone: String,
    // parent: String,
});

const JuniorEdu = mongoose.model('JuniorEdu', JuniorEduSchema);
module.exports = JuniorEdu;