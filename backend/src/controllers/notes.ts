import { RequestHandler } from "express"
import NoteModel from '../models/note'
import createHttpError, { isHttpError } from 'http-errors'
import mongoose from 'mongoose'

export const getNotes: RequestHandler = async (req, res, next) => { //req(uest) res(ponse) next(function)
    try { //This runs first, or attempts to at least
        const notes = await NoteModel.find().exec() //Waits for notes from notemodel
        res.status(200).json(notes) //Return notes to user
    } catch (error) { //If try doesn't work, throw out error
        next(error) //This connects to
    }
}

export const getNote: RequestHandler = async (req, res, next) => {
    const noteId = req.params.noteId //NOTICE: noteId has to be IDENTICAL to what it is in routes, for example. I assume it can be called anything, but keep it all the same!

    try {
        if (!mongoose.isValidObjectId(noteId)) { //mongoose can check if our noteId is valid or not
            throw createHttpError(400, 'noteId is invalid')
        }
        const note = await NoteModel.findById(noteId).exec()
        if (!note) {
            throw createHttpError(404, 'Note not found!')
        }
        res.status(200).json(note)
    } catch (error) {
        next(error)
    }
}

interface CreateNoteBody {
    title?:string,
    text?:string
}

/*
    STATUS CODES:
    1xx - Request was received, continuing process
    2xx - Request was successfully received, understood & accepted
    3xx - Redirection
    4xx - Client Error
    5xx - Server Error
*/

export const createNote: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req,res,next)=>{ //Create note
    const title = req.body.title
    const tx = req.body.text
    
    try{
        if (!title) {
            throw createHttpError(400, 'Title does not exist (it is required!)')
        }

        const newNote = await NoteModel.create({ //This lets us create a new note
            title: title,
            text: tx
        })

        res.status(201).json(newNote)
    } catch (error) {
        next(error)
    }
}

interface UpdateNoteParams {
    noteId: string //HAS to have the same name as the argument in our routes
}

interface UpdateNoteBody {
    title?: string,
    text?: string
}

export const updateNote: RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async(req, res, next) => {
    const noteId = req.params.noteId
    const newTitle = req.body.title
    const Tx = req.body.text
    try {
        if (!mongoose.isValidObjectId(noteId)) { //mongoose can check if our noteId is valid or not
            throw createHttpError(400, 'noteId is invalid')
        }

        if (!newTitle) {
            throw createHttpError(400, 'Title does not exist (it is required!)')
        }

        const note = await NoteModel.findById(noteId).exec()

        if (!note) {
            throw createHttpError(404, 'Original note was not found!')
        }

        note.title = newTitle
        note.text = Tx

        const updatedNote = await note.save() //waits for note to save
        //We COULD also use NoteModel.findByIdAndUpdate()
        res.status(200).json(updatedNote)
    } catch (error) {
        next(error)
    }
}

export const deleteNote: RequestHandler = async(req, res, next) => {
    const id = req.params.noteId

    try {
        if (!mongoose.isValidObjectId(id)){
            throw createHttpError(400, 'noteId is invalid')
        }

        const note = await NoteModel.findById(id).exec()

        if (!note) {
            throw createHttpError(404, 'Original note was not found!')
        }

        await note.deleteOne()

        res.sendStatus(204)

    } catch (error) {
        next(error)
    }
}