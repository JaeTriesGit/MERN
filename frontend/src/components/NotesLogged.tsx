import React, { useEffect, useState } from 'react';
import { Note as NoteModel } from '../models/note'
import * as NotesApi from '../network/notes_api'

import NoteComp from './note'
import Post from './post'
import Edit from './edit'

interface NoteBody{ 
    onSuccess:(note: NoteModel)=>void
}

const NotesLogged = ({onSuccess}:NoteBody) => {

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
            if (noteEdit?._id === note._id) {
                setNoteEdit(null)
            }
            setNotes(notes.filter(aNote => aNote._id !== note._id))
        } catch (error) {
            console.error(error)
            alert(error)
        }
    }

    async function Update(){
        console.log('UpDaTe')
        try{
            setNoteEdit(null)
            const notes = await NotesApi.fetchNotes()
            setNotes(notes)
        } catch(error){
            alert(error)
        }
    }

    function GetBoolean(noteToCompare:NoteModel){
        if (noteEdit?._id === noteToCompare._id){
            return false
        } else {
            return true
        }
    }

    return(
    <>
        { noteEdit ? 
            <Edit 
                note={noteEdit} 
                onCancel={()=>{setNoteEdit(null)}} 
                noteSave={()=>{Update()}}
            /> 
            :
            <Post 
                noteSaved={(res) => {setNotes([...notes, res])}}
            />
        }

        <div className='Notes'>
            {notes.length > 0 && notes.map(note => (
            <NoteComp 
                noteClicked={(note) => {
                    if (!noteEdit){
                        setNoteEdit(note); 
                        window.scrollTo(0,0);
                    } else {
                        alert('Already editing a note!')
                    }
                }}
                note={note} 
                Delete={Delete}
                Editing={GetBoolean(note)}
                key={note._id}
            />
            ))}
        </div>
    </>
    )
}

export default NotesLogged

/*

<form id='EditForm' action={'/api/notes/'} method='patch' className='Testing' onSubmit={handleSubmit(Submit)}>
    <p className='The-Title'>Edit Note</p>
    <input id='Edit-Title' type='text' className='Form-Title' {...register('title')} defaultValue={noteEdit?.title}/>
    <textarea id='Edit-Text' className='Form-Text' {...register('text')} defaultValue={noteEdit?.text}/>
    <div className='Edit-Ctrl'>
        <button type='submit' form='EditForm'>Complete Edit</button>
        <button onClick={() => setNoteEdit(null)}>Cancel</button>
    </div>
</form>

        */