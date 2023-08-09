import express from 'express'
import * as NotesController from '../controllers/notes'

const Router = express.Router()

Router.get("/", NotesController.getNotes)

Router.post('/', NotesController.createNote)

export default Router