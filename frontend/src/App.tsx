import React, { useEffect, useState } from 'react';
import './App.css';
import { Note as NoteModel } from './models/note'

import NoteComp from './components/note'
import Post from './components/post'
import SignUp from './components/signup'
import Navbar from './components/navbar'
import Login from './components/login'

import * as NotesApi from './network/notes_api'

function App() {

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



  return (
    <div className="Main">
      <Navbar/>
      <Login onDismiss={() => {}} onSuccess={() => {}}/>
      <SignUp onDismiss={() => {}} onSuccess={() => {}}/>
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

    </div>
  );
}

//<Post/>

export default App;