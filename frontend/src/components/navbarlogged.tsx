import { User } from '../models/user'
import * as NotesAPI from '../network/notes_api'

interface NavpropsLogged{
    user: User,
    onLogout: () => void
}

const NavbarLogged = ({user, onLogout} : NavpropsLogged) => {

    async function Logout(){
        try{
            await NotesAPI.logout()
            onLogout()
        } catch(error){
            alert(error)
        }
    }

    return(
        <div className='NavControls'>
            <p id='Username'>Hello, {user.username}!</p>
            <button onClick={Logout} className='Navbutton'>Sign Out</button>
        </div>
    )
}

export default NavbarLogged