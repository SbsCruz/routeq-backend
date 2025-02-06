const Subscription = require('../models/subscription.model');
const Route = require('../models/route.model');
const User = require('../models/user.model'); // Para obtener información de los usuarios

// Crear una nueva suscripción y reducir asientos disponibles
exports.createSubscription = async (req, res) => {
    try {
        const { userId, routeId } = req.body;

        // Verificar si la ruta existe
        const route = await Route.findById(routeId);
        if (!route) return res.status(404).json({ message: "Route not found" });

        // Verificar si hay asientos disponibles
        if (route.availableSeats <= 0) {
            return res.status(400).json({ message: "No available seats" });
        }

        // Verificar si el usuario ya está suscrito a la misma ruta
        const existingSubscription = await Subscription.findOne({ userId, routeId });
        if (existingSubscription) {
            return res.status(400).json({ message: "User is already subscribed to this route" });
        }

        // Crear la suscripción
        const newSubscription = new Subscription({ userId, routeId, subscriptionDate: new Date() });
        await newSubscription.save();

        // Reducir los asientos disponibles en la ruta
        route.availableSeats -= 1;
        await route.save();

        res.status(201).json({ message: "Subscription created successfully", newSubscription });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todas las suscripciones
exports.getSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find()
            .populate('userId', 'firstName lastName email') // Información del usuario
            .populate('routeId', 'departureTime availableSeats'); // Información de la ruta
        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todos los usuarios suscritos a una ruta específica
exports.getUsersByRoute = async (req, res) => {
    try {
        const { routeId } = req.params;

        // Verificar si la ruta existe
        const route = await Route.findById(routeId);
        if (!route) return res.status(404).json({ message: "Route not found" });

        // Buscar todas las suscripciones a la ruta
        const subscriptions = await Subscription.find({ routeId }).populate('userId', 'firstName lastName email phone');

        if (subscriptions.length === 0) {
            return res.status(404).json({ message: "No users subscribed to this route" });
        }

        // Extraer solo la información de los usuarios
        const users = subscriptions.map(sub => sub.userId);

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
