import React, { useEffect, useState } from 'react';
import './App.css';
import { Note as NoteModel } from './models/note'
import NoteComp from './components/note'
import Post from './components/post'
import * as NotesApi from './network/notes_api'

function App() {

  const [notes, setNotes] = useState<NoteModel[]>([])

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

  return (
    <div className="App">
      <Post/>
      <div className='Notes'>
        {notes.map(note => (
          <NoteComp note={note} Delete={Delete} key={note._id}/>
        ))}
      </div>
    </div>
  );
}

export default App;