const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');

const SECRET = "studentcollabsecret"; // store in .env later

// Signup
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "User exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashed });

    const token = jwt.sign({ id: newUser._id }, SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: newUser._id, name: newUser.name } });
});

// Login
router.post('/login', async (req, res) => {
    console.log('BODY RECEIVED:', req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Wrong password" });

    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, name: user.name } });
});

module.exports = router;
