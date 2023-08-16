import { Note } from '../models/note'
import { NoteInput } from '../network/notes_api'
import { useForm } from 'react-hook-form'
import * as NoteAPI from '../network/notes_api'
import Send from '../images/send.svg'

interface EditNoteProps {
    noteToEdit?: Note,
    noteSaved: (note: Note) => void
}

const EditNote = ({noteToEdit, noteSaved}:EditNoteProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NoteInput>({
        defaultValues: {
            title: noteToEdit?.title || '',
            text: noteToEdit?.text || ''
        }
})

    async function submitForm(input: NoteInput){
        try{
            let noteRes: Note
            if (noteToEdit){
                noteRes= await NoteAPI.updateNote(noteToEdit._id, input)
            } else {
                noteRes= await NoteAPI.addNote(input)
            }
            noteSaved(noteRes)
        } catch(error){
            console.error(error)
            alert(error)
        }
    }

    return(
        <form id='theForm' action='/api/notes' method='post' onSubmit={handleSubmit(submitForm)}>
            <input id='FormTitle' type='text' {...register('title')} placeholder='Title'/>
            <textarea id='FormText' {...register('text')} placeholder='Tx'/>
            <input id='FormButton' form='theForm' src={Send} type='image'/>
        </form>
    )
}

export default EditNote