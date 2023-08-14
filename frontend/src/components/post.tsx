import { Note } from '../models/note'
import { useForm } from 'react-hook-form'
import { NoteInput } from '../network/notes_api'
import * as NotesApi from '../network/notes_api'

interface addNoteProps {
    noteSaved: (note: Note) => void
}

export default function Post({ noteSaved }){

    const { register, submit, formState : { errors, isSubmitting }} = useForm<NoteInput>()
    
    const requestProperties = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: '',
            text:''
        })
    }

    async function Submit(input: NoteInput){
        try{
            const Resp = await NotesApi.addNote(input)
            noteSaved(Resp)
        } catch (error){
            console.error(error)
            alert(error)
        }
    }

    return(
        <div className='Post'>
            <form method='post' id='CreateNote'>
                <input type='text' placeholder='Title' className='Post-Title'/>
                <textarea placeholder='Text' className='Post-Text'/>
                <input type='submit' className='PostBtn' form='CreateNote'/>
            </form>
        </div>
    )
}