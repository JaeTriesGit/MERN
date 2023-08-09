import 'dotenv/config'
import exp from 'express'
import NoteModel from './models/note'

const app = exp()

app.get("/", async (req, res) => { 
    const notes = await NoteModel.find().exec() //Waits for notes from notemodel
    res.status(200).json(notes) //Return notes to user
})

export default app