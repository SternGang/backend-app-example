// dotenv is a helper library that reads .env files (environment) and parses them for convenience
require('dotenv').config()

// pull out the PORT and db URI for use in the application
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT
}