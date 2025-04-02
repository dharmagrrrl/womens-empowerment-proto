const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS configuration - more permissive
app.use(cors());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});

app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/empoweru', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Level Schema
const levelSchema = new mongoose.Schema({
  levelId: String,
  gainItems: [{
    text: String,
    timestamp: Number
  }],
  loseItems: [{
    text: String,
    timestamp: Number
  }]
});

const Level = mongoose.model('Level', levelSchema);

// Routes
app.get('/api/level/:id', async (req, res) => {
  try {
    let level = await Level.findOne({ levelId: req.params.id });
    if (!level) {
      level = new Level({ levelId: req.params.id, gainItems: [], loseItems: [] });
      await level.save();
    }
    res.json(level);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/level/:id/gain', async (req, res) => {
  try {
    let level = await Level.findOne({ levelId: req.params.id });
    if (!level) {
      level = new Level({ levelId: req.params.id, gainItems: [], loseItems: [] });
    }
    level.gainItems.push({
      text: req.body.text,
      timestamp: Date.now()
    });
    await level.save();
    res.json(level);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/level/:id/lose', async (req, res) => {
  try {
    let level = await Level.findOne({ levelId: req.params.id });
    if (!level) {
      level = new Level({ levelId: req.params.id, gainItems: [], loseItems: [] });
    }
    level.loseItems.push({
      text: req.body.text,
      timestamp: Date.now()
    });
    await level.save();
    res.json(level);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/level/:id/gain/:timestamp', async (req, res) => {
  try {
    let level = await Level.findOne({ levelId: req.params.id });
    if (!level) {
      return res.status(404).json({ message: 'Level not found' });
    }
    level.gainItems = level.gainItems.filter(item => item.timestamp !== parseInt(req.params.timestamp));
    await level.save();
    res.json(level);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/level/:id/lose/:timestamp', async (req, res) => {
  try {
    let level = await Level.findOne({ levelId: req.params.id });
    if (!level) {
      return res.status(404).json({ message: 'Level not found' });
    }
    level.loseItems = level.loseItems.filter(item => item.timestamp !== parseInt(req.params.timestamp));
    await level.save();
    res.json(level);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Handle OPTIONS requests
app.options('*', cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 