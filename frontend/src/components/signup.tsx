import { useForm } from 'react-hook-form'
import { User } from '../models/user'
import { UserBody } from '../network/notes_api'
import * as NotesAPI from '../network/notes_api'

interface SignUpBody{
    onDismiss: () => void,
    onSuccess: (user: User) => void
}

const SignUp = ({onDismiss, onSuccess}:SignUpBody) => {
    const { register, handleSubmit, formState: {errors, isSubmitting}} = useForm<UserBody>()
    
    async function Submit(cred:UserBody) {
        try{
            const newUser = await NotesAPI.signUp(cred)
            onSuccess(newUser)
        } catch(error){
            alert(error)
        }
    }
    
    return(
        <form id='SignUpForm' className='UserForm' action='/api/users' method='post' onSubmit={handleSubmit(Submit)}>
            <input className='Text-Field' type='text' {...register('username')} placeholder='Enter Username'/>
            <input className='Text-Field' {...register('email')} placeholder='Enter Email'/>
            <input className='Text-Field' {...register('password')} placeholder='Enter Password' type='password'/>
            <button className='Submit-Button' form='SignUpForm' type='submit'>Sign Up</button>
        </form>
    )
}

export default SignUp