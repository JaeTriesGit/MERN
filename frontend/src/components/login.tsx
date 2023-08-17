import { useForm } from 'react-hook-form'
import { User } from '../models/user'
import { LoginCredentials } from '../network/notes_api'
import * as NotesAPI from '../network/notes_api'

interface LoginBody{
    onDismiss: () => void,
    onSuccess: (user: User) => void
}

const Login = ({onDismiss, onSuccess}:LoginBody) => {
    const { register, handleSubmit, formState: {errors, isSubmitting}} = useForm<LoginCredentials>()
    
    async function Submit(cred:LoginCredentials) {
        try{
            const newUser = await NotesAPI.login(cred)
            onSuccess(newUser)
        } catch(error){
            alert(error)
        }
    }
    
    return(
        <form id='LoginForm' className='UserForm' action='/api/users' method='post' onSubmit={handleSubmit(Submit)}>
            <input className='Text-Field' type='text' {...register('username')} placeholder='Enter Username'/>
            <input className='Text-Field' {...register('password')} placeholder='Enter Password' type='password'/>
            <button className='Submit-Button' form='LoginForm' type='submit' />
        </form>
    )
}

export default Login