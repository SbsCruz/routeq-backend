const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    routeId: { type: String, required: true },
    subscriptionDate: { type: Date, default: Date.now },
    pickUpLat: {type: Number, required: true},
    pickUpLong: {type: Number, required: true},
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
