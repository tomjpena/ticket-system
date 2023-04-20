const express = require('express')
const router = express.Router({mergeParams: true})
const { getTicketsAdmin } = require('../controllers/ticketController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getTicketsAdmin)

module.exports = router