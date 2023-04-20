const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// @desc Get user tickets
// @route GET /api/tickets
// @access private
const getTickets = asyncHandler(async (req, res) => {
  // Get user from JWT
  const user = await User.findById(req.user.id)

  if(!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const tickets = await Ticket.find({user: req.user.id})
  
  res.status(200).json(tickets)
})

// @desc Get all tickets for admin
// @route GET /api/tickets/:adminID
// @access private
const getTicketsAdmin = asyncHandler(async (req, res) => {
  // Get user from JWT
  const user = await User.findById(req.user.id)

  if(!user) {
    res.status(401)
    throw new Error('User not found')
  }
  if(user.isStaff === false) {
    res.status(401)
    throw new Error('User is not staff')
  }

  const tickets = await Ticket.find()
  
  res.status(200).json(tickets)
})

// @desc Get single ticket
// @route GET /api/tickets/:id
// @access private
const getSingleTicket = asyncHandler(async (req, res) => {
  // Get user from JWT
  const user = await User.findById(req.user.id)

  if(!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.id)

  if(!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }
  
  res.status(200).json(ticket)
})

// @desc Create new ticket
// @route POST /api/tickets
// @access private
const createTicket = asyncHandler(async (req, res) => {
  const {product, description} = req.body

  if(!product || !description) {
    res.status(400)
    throw new Error('Please enter all fields')
  }

  // Get user from JWT
  const user = await User.findById(req.user.id)

  if(!user) {
    res.status(401)
    throw new Error('User not found')
  }
  
  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: 'new'
  })

  res.status(201).json(ticket)
})


// @desc Delete user tickets
// @route DELETE /api/tickets/:id
// @access private
const deleteTicket = asyncHandler(async (req, res) => {
  // Get user from JWT
  const user = await User.findById(req.user.id)

  if(!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.id)

  if(!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  await ticket.deleteOne()
  
  res.status(200).json({success: true})
})


// @desc Update user ticket
// @route PUT /api/tickets/:id
// @access private
const updateTicket = asyncHandler(async (req, res) => {
  // Get user from JWT
  const user = await User.findById(req.user.id)

  if(!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.id)

  if(!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })
  
  res.status(200).json(updatedTicket)
})



module.exports = {
  getTickets,
  getSingleTicket,
  createTicket,
  deleteTicket,
  updateTicket,
  getTicketsAdmin 
}