const mongoose = require('mongoose');
const Product = require('./models/Product'); // Correct path to Product model

const uri = 'mongodb+srv://sridarshini:1234@merntourdb.hgtwu.mongodb.net/';

mongoose.connect(uri)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

const seedProducts = [
  {
    name: 'Product 1',
    price: 29.99,
    description: 'Description for product 1',
    image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRBkcIuT1FgIO1_FFTDJtcx07kzKddN6Esqi3Qd8JLYAdhn5k1G_vVvaMvIwg2y2ux2FXXYS60jXaIlYdP0-ffvJflou6SkwD6SKWVs1-cdCAFkj5BCQtTi',
  },
  {
    name: 'Product 2',
    price: 49.99,
    description: 'Description for product 2',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Product 3',
    price: 19.99,
    description: 'Description for product 3',
    image: 'https://via.placeholder.com/150',
  },
];

async function seedDB() {
  try {
    await Product.deleteMany(); // Clear existing products
    await Product.insertMany(seedProducts); // Insert new products
    console.log('Database seeded!');
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.connection.close();
  }
}

seedDB();
