const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User');  // Ensure this imports the updated User model

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect('mongodb+srv://sridarshini:1234@merntourdb.hgtwu.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// API Routes
// Register User
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user instance
    const newUser = new User({ name, email, password });
    
    // Save the user to the database
    await newUser.save();
    
    // Send a success response
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login User
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
// Product Schema and Model
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
});

const Product = mongoose.model('Product', productSchema);

// API Endpoints
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
const Review = require('./models/Review');

// Fetch all reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new review
app.post('/api/reviews', async (req, res) => {
  const { name, rating, comment } = req.body;

  try {
    const review = new Review({ name, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: 'Failed to add review' });
  }
});


// Cart APIs
// Get user's cart items
app.get('/api/cart/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const items = await Cart.find({ userId });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cart items', error });
  }
});

// Add item to user's cart
app.post('/api/cart/add', async (req, res) => {
  const { userId, name, price, quantity } = req.body;
  try {
    const newItem = new Cart({ userId, name, price, quantity });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: 'Failed to add item to cart', error });
  }
});

// Remove item from user's cart
app.delete('/api/cart/remove/:userId/:itemId', async (req, res) => {
  const { userId, itemId } = req.params;
  try {
    const item = await Cart.findOneAndDelete({ _id: itemId, userId });
    if (!item) {
      return res.status(404).json({ message: 'Item not found in user cart' });
    }
    res.json({ message: 'Item removed', item });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove item from cart', error });
  }
});

// Clear user's cart
app.delete('/api/cart/clear/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    await Cart.deleteMany({ userId });
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to clear cart', error });
  }
});
// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});