const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
    startPoint: { type: String, required: true },
    endPoint: { type: String, required: true },
    departureTime: { type: String, required: true },
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
    routeState: {type: Boolean, required: true},
    // TODO: talk about routes
});

module.exports = mongoose.model('Route', routeSchema);
