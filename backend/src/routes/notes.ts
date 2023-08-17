import express from 'express'
import * as NotesController from '../controllers/notes'

const Router = express.Router()
//localhost:3000/api/notes
Router.get("/", NotesController.getNotes)
//localhost:3000/api/notes
Router.get('/:noteId', NotesController.getNote) 
//localhost:3000/api/notes/${noteId}
Router.post('/', NotesController.createNote)
//localhost:3000/api/notes
Router.patch('/:noteId', NotesController.updateNote)
//localhost:3000/api/notes/${noteId}
Router.delete('/:noteId', NotesController.deleteNote)
//localhost:3000/api/notes/${noteId}

export default Router