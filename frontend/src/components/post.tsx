import { Note } from '../models/note'
import { NoteInput } from '../network/notes_api'
import { useForm } from 'react-hook-form'
import * as NoteAPI from '../network/notes_api'
import Send from '../images/send.svg'

interface theNote {
    noteSaved: (note: Note) => void
}

const NewNote = ({noteSaved}:theNote) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NoteInput>({})

    async function submitForm(input: NoteInput){
        try{
            let noteRes: Note
            noteRes = await NoteAPI.addNote(input)
            noteSaved(noteRes)
        } catch(error){
            console.error(error)
            alert(error)
        }
    }

    return(
        <form id='theForm' action='/api/notes' method='post' onSubmit={handleSubmit(submitForm)}>
            <p className='The-Title'>Create a New Note</p>
            <input id='FormTitle' type='text' {...register('title')} placeholder='Enter Title'/>
            <textarea id='FormText' {...register('text')} placeholder='Enter Text'/>
            <input id='FormButton' form='theForm' src={Send} type='image'/>
        </form>
    )
}

export default NewNote