const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// LOGIN ROUTE
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if Admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ error: "Invalid Email" });

    // 2. Check Password
    const validPass = await bcrypt.compare(password, admin.password);
    if (!validPass) return res.status(400).json({ error: "Wrong Password" });

    // 3. Generate Token (Pass)
    const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET || "secretKey", { expiresIn: "1h" });
    
    res.json({ token, message: "Login Successful" });

  } catch (error) {
    res.status(500).json({ error: "Login Failed" });
  }
});

module.exports = router;