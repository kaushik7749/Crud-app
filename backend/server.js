const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('./models/User');
const Item = require('./models/Item');

const { authenticate } = require('./middleware/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/crudapp');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// JWT Token Generation
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '7d'
  });
};

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create user
    const user = new User({ name, email, password });
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

app.get('/api/auth/me', authenticate, async (req, res) => {
  try {
    res.json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Item Routes
app.get('/api/items', authenticate, async (req, res) => {
  try {
    const items = await Item.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    console.error('Get items error:', error);
    res.status(500).json({ message: 'Server error while fetching items' });
  }
});

app.post('/api/items', authenticate, async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validation
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const item = new Item({
      title,
      description,
      user: req.user._id
    });

    await item.save();
    res.status(201).json(item);
  } catch (error) {
    console.error('Create item error:', error);
    res.status(500).json({ message: 'Server error while creating item' });
  }
});

app.get('/api/items/:id', authenticate, async (req, res) => {
  try {
    const item = await Item.findOne({ 
      _id: req.params.id, 
      user: req.user._id 
    });

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(item);
  } catch (error) {
    console.error('Get item error:', error);
    res.status(500).json({ message: 'Server error while fetching item' });
  }
});

app.put('/api/items/:id', authenticate, async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validation
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const item = await Item.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, description },
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(item);
  } catch (error) {
    console.error('Update item error:', error);
    res.status(500).json({ message: 'Server error while updating item' });
  }
});

app.delete('/api/items/:id', authenticate, async (req, res) => {
  try {
    const item = await Item.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user._id 
    });

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Delete item error:', error);
    res.status(500).json({ message: 'Server error while deleting item' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

module.exports = app;