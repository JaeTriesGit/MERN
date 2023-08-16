import { Note } from '../models/note'
import { User } from '../models/user'

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init)
    if (response.ok) {
        return response
    } else {
        const errorBody = await response.json()
        const errorMessage = errorBody.error //Has to be the same variable name as in backend/src/app.ts
        throw Error(errorMessage)
    }
} //Reusable function

//CLIENT API FOR USERS ROUTE

export interface UserBody{
    username:string,
    email:string,
    password:string
}

export interface LoginCredentials{
    username:string,
    password:string
}

export async function getCurrentUser(): Promise<User> {
    const res = await fetchData('/api/users', {
        method: 'GET',
    })
    return res.json()
}

export async function signUp(credentials: UserBody): Promise<User> {
    const res = await fetchData('/api/users/signup', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(credentials)
    })
    return res.json()
}

export async function login(credentials: LoginCredentials): Promise<User> {
    const res = await fetchData('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(credentials)
    })
    return res.json()
}

export async function logout() {
    await fetchData('api/users/logout', { method: 'POST' })
}
//API FOR NOTES

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

export async function updateNote(noteId: string, note: NoteInput): Promise<Note> {
    const Resp = await fetchData('/api/notes/' + noteId,
    { method:'PATCH',
    headers: {
        'Content-Type':'application/json'
    },
    body: JSON.stringify(note)})
    return Resp.json()
}