import { Note as noteModel} from '../models/note'
import DeleteImg from '../images/delete.svg'
import Pen from '../images/pen.svg'
import { format } from '../util/format'


interface NoteProperties {
    note: noteModel,
    noteClicked: (note: noteModel) => void,
    Delete: (note: noteModel) => void,
    className?: string,
    Editing:boolean
}

export default function NoteComp({ note, noteClicked, Delete, className, Editing }: NoteProperties){

    const {
        title,
        text,
        createdAt,
        updatedAt
    } = note

    return(
        <div className='Post' 
            style={{backgroundColor: Editing ? "rgb(27, 27, 27)" : "#d49839"}}>
            <div className='Controls' style={{backgroundColor: Editing ? "rgb(17, 17, 17)" : "#a3701f"}}>
                <p className='Post-Title'>{note.title}</p>
                <div className='Ctrl'>
                    <img className='Edit' onClick={() => noteClicked(note)} src={Pen}/>
                    <img className='Delete' onClick={() => Delete(note)} src={DeleteImg}/>
                </div>
            </div>
            <p className='Post-Text'>{note.text}</p>
            <p className='Post-Date'>Created at: {format(note.createdAt)}</p> 
            <p className='Post-Date'>Updated at: {format(note.updatedAt)}</p>
        </div>
    )
}

//note. createdAt, updatedAt, text, title