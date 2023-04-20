const path = require('path')
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


//Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))
app.use('/api/admin', require('./routes/adminRoutes'))

//Server the frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))
  app.get('*', (req, res) => res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html'))
} else {
  app.get('/', (req, res) => {
  res.status(200).json({ message: 'This is the Support Desk Ticket System API' })
})
}

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))