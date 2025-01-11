const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    availableSeats: { type: Number, required: true },
    color: { type: String, required: true },
    licensePlate: { type: String, required: true },
    brand: { type: String, required: true },
    model: {type: String, required: true},
});

module.exports = mongoose.model('Car', carSchema);
