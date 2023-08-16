import { useForm } from 'react-hook-form'
import { User } from '../models/user'
import { UserBody } from '../network/notes_api'
import * as NotesAPI from '../network/notes_api'

interface SignUpBody{
    onSuccess: (user: User) => void
}

const SignUp = ({onSuccess}:SignUpBody) => {
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
        <div>  

        </div>
    )
}