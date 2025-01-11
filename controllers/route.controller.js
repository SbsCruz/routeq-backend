const Route = require('../models/route.model');

exports.createRoute = async (req, res) => {
    try {
        const newRoute = new Route(req.body);
        const savedRoute = await newRoute.save();
        res.status(201).json(savedRoute);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Método para obtener todas las rutas
exports.getRoutes = async (req, res) => {
    try {
        const routes = await Route.find();
        res.status(200).json(routes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};