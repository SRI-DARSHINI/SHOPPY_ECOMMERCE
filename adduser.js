const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust the path if needed

mongoose.connect('mongodb+srv://sridarshini:1234@merntourdb.hgtwu.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const addUser = async () => {
  const newUser = new User({
    email: 'msridarshini@gmail.com',
    password: '123456',
  });

  try {
    await newUser.save();
    console.log('User added successfully!');
  } catch (error) {
    console.error('Error adding user:', error);
  } finally {
    mongoose.disconnect();
  }
};

addUser();
