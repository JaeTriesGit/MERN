import { Note } from '../models/note'

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init)
    if (response.ok) {
        return response
    } else {
        const errorBody = await response.json()
        const errorMessage = errorBody.error //Has to be the same variable name as in backend/src/app.ts
        throw Error(errorMessage)
    }
}

export async function fetchNotes(): Promise<Note[]> {
    const Response = await fetch("/api/notes", { method: 'GET' })//Fetch can be used to fetch data
    return Response.json() //Parses response to json
}

export interface NoteInput{
    title:string,
    text?:string
}

export async function addNote(note: NoteInput): Promise<Note> {
    const Res = await fetchData('/api/notes',
    {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(note)
    })
    return Res.json()
}

export async function deleteNote(noteId: string) {
    await fetchData('/api/notes/' + noteId, 
    { method:'DELETE' })
}