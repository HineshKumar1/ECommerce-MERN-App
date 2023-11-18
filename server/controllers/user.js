const User = require('../models/user');
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const JWT = require("jsonwebtoken")
require("dotenv").config();


// Controller function to handle user creation
const addUser = async (req, res) => {
  try {
    const { name, email, password, phone, address, role } = req.body;
    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      name,
      email,
      password: hashedPassword, 
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

const login = async(req,res,next)=>{
  try {
    const {email,password} = req.body;
    if(!email || !password){
      return res.status(404).send({
        status:false,
        message:"Invalid Email and password!"
      })
    }
    const user = await User.findOne({email});
    if(!user){
      return res.status(404).send({
        status:false,
        message:"Email not registered!"
      })
    }
    const match = await comparePassword(password,user.password);
    if(!match){
      return res.status(404).send({
        status:false,
        message:"Password is incorrect!"
      })
    }
    const token = await JWT.sign({_id:user._id},process.env.SECRET_KEY,{expiresIn:'7d'});

    res.status(200).send({
      status:true,
      message:"Successfully Login",
      token
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status:false,
      message:"Failed to login!",
    })
  }
}

module.exports = {
  addUser,
  login
};