const mongoose = require('mongoose');
const Cart = require('./models/Cart'); // Adjust the path if needed
const User = require('./models/User'); // Import User model to get a valid userId

mongoose.connect('mongodb+srv://sridarshini:1234@merntourdb.hgtwu.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const addCartItem = async () => {
  try {
    // Find a user (replace with your logic to find the correct user)
    const user = await User.findOne({ email: 'hi@gmail.com' }); // You can change this to find any user you want

    if (!user) {
      console.log('User not found!');
      return;
    }

    // Create a new cart item
    const newCartItem = new Cart({
      userId: user._id, // User ID from the User collection
      name: 'Laptop',
      price: 10000,
      quantity: 2,
    });

    // Save the cart item to the database
    await newCartItem.save();
    console.log('Cart item added successfully!');
  } catch (error) {
    console.error('Error adding cart item:', error);
  } finally {
    mongoose.disconnect();
  }
};

addCartItem();
