import React, { useEffect, useState } from 'react';
import { Note as NoteModel } from '../models/note'
import * as NotesApi from '../network/notes_api'

import NoteComp from './note'
import Post from './post'

const NotesLogged = () => {

    const [notes, setNotes] = useState<NoteModel[]>([])

    const [noteEdit, setNoteEdit] = useState<NoteModel|null>(null)

    useEffect(() => {
        async function loadNotes(){
        try {
            const notes = await NotesApi.fetchNotes()
            setNotes(notes)
        } catch (error) {
            console.error(error)
            alert(error)
        }
        }
        loadNotes()
    }, [])

    async function Delete(note: NoteModel){ //Should delete through delete endpoint
        try{
            await NotesApi.deleteNote(note._id)
            setNotes(notes.filter(aNote => aNote._id !== note._id))
        } catch (error) {
            console.error(error)
            alert(error)
        }
  }

    return(
        <>
        <Post noteSaved={(res) => {setNotes([...notes, res])}}/>

        <div className='Notes'>
            {notes.map(note => (
            <NoteComp 
                noteClicked={setNoteEdit} 
                note={note} 
                Delete={Delete} 
                key={note._id}
            />
            ))}
        </div>
      </>
    )
}

export default NotesLogged