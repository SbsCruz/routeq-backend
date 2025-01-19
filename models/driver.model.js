const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    firebaseId: {tpe: String, unique: true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    idNumber: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
    travelNumber: {type: Number}
});

module.exports = mongoose.model('Driver', driverSchema);
