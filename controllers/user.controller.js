const User = require("../models/user.model");
const Subscription = require("../models/subscription.model");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        console.log("Creating user...")
        res.status(201).json(savedUser);
    } catch (error) {
        console.log("Error while creating user...")
        res.status(400).json({ message: error.message });
    }
};


// Obtener perfil del usuario
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const activeSubscriptions = await Subscription.countDocuments({ userId: req.params.id });
        res.status(200).json({ ...user.toObject(), activeSubscriptions });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar perfil del usuario
exports.updateUserProfile = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserSubscriptions = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si el usuario existe
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Obtener las suscripciones del usuario con detalles de la ruta
        const subscriptions = await Subscription.find({ userId: id })
            .populate('routeId', 'startPoint endPoint departureTime availableSeats');

        if (subscriptions.length === 0) {
            return res.status(404).json({ message: "No subscriptions found for this user" });
        }

        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};