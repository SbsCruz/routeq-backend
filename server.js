const express = require('express');
const connectDB = require('./config/config');
const userRoutes = require('./routes/user.route');
const driverRoutes = require('./routes/driver.route');
const carRoutes = require('./routes/car.route');
const routeRoutes = require('./routes/route.route');
const subscriptionRoutes = require('./routes/subscription.route');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
 
// Database connection
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/subs', subscriptionRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
