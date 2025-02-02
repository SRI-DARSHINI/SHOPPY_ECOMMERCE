// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize the Express app
const app = express();

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Connect to MongoDB (replace 'your_db_name' with your database name)
mongoose.connect('mongodb+srv://sridarshini:1234@merntourdb.hgtwu.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define the Product schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

// Add Product (for testing purposes)
app.post('/products', async (req, res) => {
  const { name, price, image } = req.body;

  try {
    // Create a new product instance and save it to the database
    const newProduct = new Product({ name, price, image });
    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Set the port for the app to listen on
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
