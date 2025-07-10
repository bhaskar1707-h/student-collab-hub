// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Sample route
app.get('/', (req, res) => res.send('API running'));
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
const postRoutes = require('./routes/post');
app.use('/api/posts', postRoutes);
const groupRoutes = require('./routes/group');
app.use('/api/groups', groupRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
