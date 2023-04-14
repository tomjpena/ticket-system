const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  let token
  
  // If there is authorization in the header of the request and the authorization starts with 'Bearer' for a Bearer Token
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token. It's labeled as 'Bearer {Token}'. The split makes the second element in the array the token in the request. This assigns that to the token variable
      token = req.headers.authorization.split(' ')[1]
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // Get user from token and ignoring password using .select
      req.user = await User.findById(decoded.id).select('-password')
      // Call next middleware
      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }
  
  // If theres no token
  if (!token) {
    res.status(401)
    throw new Error('Not authorized')
  }
})

module.exports = { protect } 