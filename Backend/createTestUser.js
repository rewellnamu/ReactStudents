// createTestUser.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // adjust path if needed

const run = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/student_grading'); // replace with your DB name

    const email = 'riwe@gmail.com';
    const plainPassword = '123456789';

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists.');
      return process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    await User.create({ email, password: hashedPassword });

    console.log('Test user created successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error creating user:', err);
    process.exit(1);
  }
};

run();
