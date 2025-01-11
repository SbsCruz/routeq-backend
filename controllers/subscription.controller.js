const Subscription = require('../models/subscription.model');

exports.createSubscription = async (req, res) => {
    try {
        const newSubscription = new Subscription(req.body);
        const savedSubscription = await newSubscription.save();
        res.status(201).json(savedSubscription);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Método para obtener todas las suscripciones
exports.getSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find()
            .populate('userId', 'firstName lastName email') // Información del usuario
            .populate('routeId', 'startPoint endPoint departureTime'); // Información de la ruta
        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// TODO: make query for users suscribed to route
