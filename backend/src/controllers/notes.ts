import { RequestHandler } from "express"
import NoteModel from '../models/note'

export const getNotes: RequestHandler = async (req, res, next) => { //req(uest) res(ponse) next(function)
    try { //This runs first, or attempts to at least
        const notes = await NoteModel.find().exec() //Waits for notes from notemodel
        res.status(200).json(notes) //Return notes to user
    } catch (error) { //If try doesn't work, throw out error
        next(error) //This connects to
    }
}

export const createNote: RequestHandler = async (req,res,next)=>{ //Create note
    const title = req.body.title
    const tx = req.body.text
    
    try{
        const newNote = await NoteModel.create({ //This lets us create a new note
            title: title,
            text: tx
        })

        res.status(201).json(newNote)
    } catch (error) {
        next(error)
    }
}