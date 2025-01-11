const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    routeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', required: true },
    subscriptionDate: { type: Date, default: Date.now },
    pickupDate: {type: Date, required: true},
    pickupPlace: {type: Date, required: true},
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
