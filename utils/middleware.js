// this file contains 'middleware' which are functions that have access to our requests as they flow through our server
// these functions can perform any number of actions to the requests in any specified order

// this middleware function logs the incoming request information to the console for debugging
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

// this middleware function catches any requests that do not match a route in our server
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' })
}

// this middleware function catches any errors that were thrown from our routes
const errorHandler = (error, request, response, next) => {
  // log the error to the console
  console.error(error.message)

  if (error.name === 'CastError') {
    // if the error is a CastError it means that the route was unable to convert the given id into the correct format
    // we should return a 400 (bad request)
    return response.status(400).send({ error: 'Invalid id' })
  } else if (error.name === 'ValidationError') {
    // if the error is a ValidationError it means that the request body for the resource did not meet the format for the schema
    // we should return a 400 (bad request)
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}