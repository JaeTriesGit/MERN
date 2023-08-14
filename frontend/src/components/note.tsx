import { Note as noteModel} from '../models/note'
import DeleteImg from '../images/cross.svg'

interface NoteProperties {
    note: noteModel,
    Delete: (note: noteModel) => void,
    className?: string
}

export default function NoteComp({ note, Delete, className }: NoteProperties){

    const {
        title,
        text,
        createdAt,
        updatedAt
    } = note

    return(
        <div className='Note'>
            <div className='NoteBody'>
                <p className='Title'>{note.title}</p>
                <p className='Text'>{note.text}</p>
                <p className='Timestamp'>Created at: {note.createdAt}</p>
            </div>
            <img className='Delete' src={DeleteImg} alt='Delete' onClick={() => Delete(note)}/>
        </div>
    )
}