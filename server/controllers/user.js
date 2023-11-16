const User = require('../models/user');
const { hashPassword } = require("../helpers/authHelper");

// Controller function to handle user creation
const addUser = async (req, res) => {
  try {
    const { name, email, password, phone, address, role } = req.body;
    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Use the variable name hashedPassword
      phone,
      address,
      role,
    });

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Already registered, please login!");
    }

    const savedUser = await newUser.save();
    res.status(201).json({
      status: true,
      message: "User added successfully",
      data: savedUser,
    });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addUser };
