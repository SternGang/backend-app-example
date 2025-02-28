// import configs from the .env file
const config = require('./utils/config')

// import express and create the server app
const express = require('express')
const app = express()

// import cors, router, and middleware components
const cors = require('cors')
const notesRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')

// use mongoose and connect to the db
const mongoose = require('mongoose')
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.error('error connection to MongoDB:', error.message)
  })

// set server to use some middleware for cors, parsing json, and logging requests
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

// set server to use the notes router 
app.use('/api/notes', notesRouter)

// set server to use the middleware for routing unknown endpoints and errors
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

// have server listen for requests on the provided port
app.listen(config.PORT, () => {
  console.info(`Server running on port ${config.PORT}`)
})