const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firebaseId: {type: String, unique: true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    idNumber: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('User', userSchema);
