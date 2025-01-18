const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
    startPoint: { type: String, required: true },
    endPoint: { type: String, required: true },
    departureTime: { type: String, required: true },
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
    routeState: {type: Boolean, required: true},
    startLong: {type: Number, required: true},
    finalLong: {type: Number, required: true},
    startLat: {type: Number, required: true},
    finalLat: {type: Number, required: true},
});

module.exports = mongoose.model('Route', routeSchema);
