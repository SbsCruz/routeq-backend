const Driver = require("../models/driver.model");
const Car = require("../models/car.model");
const Route = require("../models/route.model");
const admin = require("firebase-admin");

exports.createDriver = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Extraer token del header
        if (!token) return res.status(401).json({ message: "No token provided" });

        // Verificar el token con Firebase y obtener el UID
        const decodedToken = await admin.auth().verifyIdToken(token);
        const firebaseId = decodedToken.uid;

        // Verificar si el conductor ya existe en la base de datos
        const existingDriver = await Driver.findOne({ firebaseId });
        if (existingDriver) {
            return res.status(400).json({ message: "Driver already exists" });
        }

        // Crear el conductor en la base de datos con el UID de Firebase
        const newDriver = new Driver({
            firebaseId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthDate: req.body.birthDate,
            idNumber: req.body.idNumber,
            phone: req.body.phone,
            email: req.body.email,
            carId: req.body.carId || null, // Si no tiene auto, asigna null
            travelNumber: req.body.travelNumber || 0 // Por defecto, inicia en 0 viajes
        });

        const savedDriver = await newDriver.save();
        console.log("Driver created successfully");
        res.status(201).json(savedDriver);
    } catch (error) {
        console.error("Error while creating driver:", error);
        res.status(400).json({ message: error.message });
    }
};



exports.getDrivers = async (req, res) => {
    try {
        const drivers = await Driver.find().populate('carId');
        res.json(drivers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Obtener perfil del conductor
exports.getDriverProfile = async (req, res) => {
    try {
        const driver = await Driver.findById(req.params.id);
        if (!driver) return res.status(404).json({ message: "Driver not found" });

        const completedTrips = await Route.countDocuments({ driverId: req.params.id });
        res.status(200).json({ ...driver.toObject(), completedTrips });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar perfil del conductor
exports.updateDriverProfile = async (req, res) => {
    try {
        const updatedDriver = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDriver) return res.status(404).json({ message: "Driver not found" });

        res.status(200).json(updatedDriver);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener información del auto
exports.getCarInfo = async (req, res) => {
    try {
        // Encuentra al conductor por su ID
        const driver = await Driver.findById(req.params.id).populate('carId');
        if (!driver) return res.status(404).json({ message: "Driver not found" });

        // Extrae la información del carro desde el conductor
        const car = driver.carId;
        if (!car) return res.status(404).json({ message: "Car not found for this driver" });

        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Obtener historial de rutas
exports.getDriverRoutes = async (req, res) => {
    try {
        const routes = await Route.find({ driverId: req.params.id });
        res.status(200).json(routes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
