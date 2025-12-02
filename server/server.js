const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const serviceRoutes = require('./routes/serviceRoutes'); // Added
const authRoutes = require('./routes/authRoutes'); // <--- 1. Import This

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

// Main Routes
app.use('/api/services', serviceRoutes); // Added
app.use('/api/auth', authRoutes); // <--- 2. Add This Line
app.use('/api/services', serviceRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to TanuSri Sounds API!');
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});