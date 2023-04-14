// Middleware for handlinng exceptions inside asyn functions and passing to errorhandler
const asyncHandler = require('express-async-handler')
// Import to encrypt password being saved in the db
const bcrypt = require('bcryptjs')
// import json web token for validating access to website functions
const jwt = require('jsonwebtoken')
// Import mongoose schema
const User = require('../models/userModel');
const userModel = require('../models/userModel');


// @desc Registers user 
// @route /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
  // Get and destructure body data
  const {name, email, password} = req.body

  //Validation to ensure all fields exist
  if(!name || !email || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  // Does user exist?
  const userExists = await User.findOne({email})
  // Throw error if user exists
  if (userExists) {
    res.status(400)
    throw new Error('User with this email already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPass = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPass
  })

  // Return data to client and throw error if user data is invalid
  if(user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new error('Invalid user data')
  }
})

// @desc Logs user in 
// @route /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  // Get and destructure body data
  const {email, password} = req.body

  // Find user with email entered
  const user = await User.findOne({email})

  // Compare password entered with password of found user
  const passMatch = await bcrypt.compare(password, user.password)

  // Check user and password match
  if(user && passMatch) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or username')
  }
})

// @desc Get current user
// @route /api/users/me
// @access private
const getMe = asyncHandler(async (req, res) => {
  // Creating object with only the information needed
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name
  }
  res.status(200).json(user)
})




// Generate token
const generateToken = (id) => {
  // .sign first argument is used as { id: id } but since they have the same name, its written here as just { id }
  return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '30d'})
}

module.exports = {
  registerUser,
  loginUser,
  getMe
}