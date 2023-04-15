const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

const PORT = process.env.PORT || 5000

// Connect to db
connectDB()

const app = express()

// Body parser middleware
// Raw json
app.use(express.json())
// form urlencoded
app.use(express.urlencoded({extended: false}))

//Welcome message to anyone accessing api at root
app.get('/', (req, res) => {
  res.status(200).json({ message: 'This is the Support Desk Ticket System API' })
})

//Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))