// use the express router to contain all of the requests for our notes resource
// this is used to partition our resources from the primary application - instead of having all of these request handlers in the single 'app'
// we can partition our requests specific to notes here to logically separate them and when another resources is added, it too can have a separate router
const notesRouter = require('express').Router()

// the note model defines the 'shape' of a note and ensures the data in the request and response meets the requirements based on the defined model
const Note = require('../models/note')

// this route returns all notes resources
notesRouter.get('/', (request, response) => {
  // since the Note model is using mongoose, it defines a find function to return the specified resources (in this case all of them)
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

// this route returns the note matching the id provided in the request
notesRouter.get('/:id', (request, response, next) => {
  // since the Note model is using mongoose, it defines a findById function which will fetch the resource matching the id provided
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        // if the resource was found, return it as json
        response.json(note)
      } else {
        // if the resource was not found, return a 404 (not found) response
        response.status(404).end()
      }
    })
    // if the request encountered an error, return the error to the 'next' function which will be handled in the app to process the error
    .catch(error => next(error))
})

// this route creates a new note using the information provided in the body of the request
notesRouter.post('/', (request, response, next) => {
  const body = request.body

  // create a new Note model based on the request body
  const note = new Note({
    title: body.title,
    content: body.content
  })

  // since the Note model is using mongoose, it defines a save function which will attempt to save the resource and ensure it meets the schema requirements
  note.save()
    .then(savedNote => {
      // if the resource was created and is valid, return it as json
      response.json(savedNote)
    })
    // if the request encountered an error, return the error to the 'next' function which will be handled in the app to process the error
    .catch(error => next(error))
})

// this route deletes the note matching the id provided in the request
notesRouter.delete('/:id', (request, response, next) => {
  // since the Note model is using mongoose, it defines a findByIdAndDelete function which will fetch the resource matching the id provided and delete it
  Note.findByIdAndDelete(request.params.id)
    .then(() => {
      // if the resource was found and deleted, return a 204 (no content) indicating a success - but nothing to return
      response.status(204).end()
    })
    // if the request encountered an error, return the error to the 'next' function which will be handled in the app to process the error
    .catch(error => next(error))
})

// this route replaces an existing note using the information provided in the body of the request
notesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  // create a new Note model based on the request body
  const note = {
    title: body.title,
    content: body.content,
  }

  // since the Note model is using mongoose, it defines a findByIdAndUpdate function which will fetch the resource matching the id provided and overwrite it
  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      // if the resource was updated and is valid, return it as json
      response.json(updatedNote)
    })
    // if the request encountered an error, return the error to the 'next' function which will be handled in the app to process the error
    .catch(error => next(error))
})

module.exports = notesRouter