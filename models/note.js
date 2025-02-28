// mongoose is a library that simplifies object modeling for mongodb
const mongoose = require('mongoose')

// for our notes resource, we first define the schema for the data shape
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5
  },
  content: {
    type: String,
    required: true,
    minlength: 5
  }
})

// this set function for the schema allows the API to transform the json to convert the id attribute in mongodb from '_id' to 'id'
// also we remove the '__v' attribute which contains the version, which we do not want to include in our response
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)