const path = require('path')
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const cors = require('cors')

const PORT = process.env.PORT || 5000

// Connect to db
connectDB()

const app = express()

app.use("/", cors({
  origin: "https://ithelpdeskclient.onrender.com",
  credentials: true,
  exposedHeaders: ["Set-Cookie"],
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Authorization, Content-Type',
}));

// Body parser middleware
// Raw json
app.use(express.json())
// form urlencoded
app.use(express.urlencoded({extended: false}))


//Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))
app.use('/api/admin', require('./routes/adminRoutes'))

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))