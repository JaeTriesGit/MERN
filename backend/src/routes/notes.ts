import express from 'express'
import * as NotesController from '../controllers/notes'

const Router = express.Router()

Router.get("/", NotesController.getNotes)

Router.get('/:noteId', NotesController.getNote) 
/*
    This allows us to get singular notes with their ID's (localhost:4000/api/notes/noteId)
    REMEMBER: to properly be able to use "noteId" we need to use the exact same letter casing & everything
    and also just remember we can probably set it to anything we want 
*/
Router.post('/', NotesController.createNote)

Router.patch('/:noteId', NotesController.updateNote)

Router.delete('/:noteId', NotesController.deleteNote)

export default Router