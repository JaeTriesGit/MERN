import { Note as NoteModel } from '../models/note'
import { useForm } from 'react-hook-form'
import * as NotesApi from '../network/notes_api'

interface EditBody{
    note: NoteModel,
    onCancel: (note: NoteModel)=>void,
    noteSave: (note: NoteModel)=>void
}

export default function Edit({note, onCancel, noteSave}:EditBody){

    const { register, handleSubmit, formState: {errors, isSubmitting}} = useForm<NoteModel>()
    let NoteID = note._id
    async function Submit(note:NoteModel) {
        
        console.log(NoteID)
        try{
            const updated = await NotesApi.updateNote(NoteID, note)
            noteSave(updated)
        } catch(error){
            alert(error)
        }
    }

    return(
        <form id='EditForm' action={'/api/notes/'} method='patch' className='Testing' onSubmit={handleSubmit(Submit)}>
            <p className='The-Title'>Edit Note</p>
            <input id='Edit-Title' type='text' className='Form-Title' {...register('title')} defaultValue={note.title}/>
            <textarea id='Edit-Text' className='Form-Text' {...register('text')} defaultValue={note.text}/>
            <div className='Edit-Ctrl'>
                <button type='submit' form='EditForm'>Complete Edit</button>
                <button onClick={() => onCancel(note)}>Cancel</button>
            </div>
        </form>
    )
}