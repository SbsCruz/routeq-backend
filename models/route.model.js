const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
    departureTime: { type: String, required: true },
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
    routeState: {type: Boolean, required: true},
    startLong: {type: Number, required: true},
    finalLong: {type: Number, required: true},
    startLat: {type: Number, required: true},
    finalLat: {type: Number, required: true},
    routeName: {type: String, required: true},
    startPoint: {type: String, required: true},
    finalPoint: {type: String, required: true}    
});

module.exports = mongoose.model('Route', routeSchema);
