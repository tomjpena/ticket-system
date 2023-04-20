const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')
const Note = require('../models/noteModel')

// @desc Get notes on a ticket
// @route GET /api/tickets/:ticketId/notes
// @access private
const getNotes = asyncHandler(async (req, res) => {
  // Get user from JWT
  const user = await User.findById(req.user.id)

  if(!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.ticketId)

  const notes = await Note.find({ticket: req.params.ticketId})
  
  res.status(200).json(notes)
})

// @desc Add notes on a ticket
// @route POST /api/tickets/:ticketId/notes
// @access private
const addNotes = asyncHandler(async (req, res) => {
  // Get user from JWT
  const user = await User.findById(req.user.id)

  if(!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.ticketId)

  // if(ticket.user.toString() !== req.user.id || req.user.isStaff === true) {
  //   res.status(401)
  //   throw new Error('User not authorized1')
  // }

  const note = await Note.create({
    text: req.body.text,
    ticket: req.params.ticketId,
    isStaff: req.body.isStaff,
    user: req.user.id})
  
  res.status(200).json(note)
})

module.exports = {
  getNotes,
  addNotes
}