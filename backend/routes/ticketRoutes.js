const express = require('express')
const router = express.Router()
const { getTickets, getSingleTicket, createTicket, updateTicket, deleteTicket } = require('../controllers/ticketController')

const {protect} = require('../middleware/authMiddleware')

// Route into the note router
const noteRouter = require('./noteRoutes')
router.use('/:ticketId/notes', noteRouter)

router.route('/').get(protect, getTickets).post(protect, createTicket)

router.route('/:id').get(protect, getSingleTicket).delete(protect, deleteTicket).put(protect, updateTicket)

module.exports = router