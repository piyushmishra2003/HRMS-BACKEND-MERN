const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Event = require('./models/Event');  // Event model add kiya

const app = express();
const PORT = 5000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully!'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Middleware
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:5173',  // yahan frontend ka port daalna
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
};
app.use(cors(corsOptions));

// Simple test route
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Existing route - users
app.post('/api/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save user' });
  }
});

// ✅ New route for saving event data from frontend
app.post('/api/events', async (req, res) => {
  try {
    const { name, email, eventTitle, date, time, timezone, conferenceDetails } = req.body;
    const newEvent = new Event({ name, email, eventTitle, date, time, timezone, conferenceDetails });
    await newEvent.save();
    res.status(201).json({ message: 'Event saved successfully!' });
  } catch (err) {
    console.error('Error saving event:', err);
    res.status(500).json({ error: 'Failed to save event' });
  }
});




// Server start
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
