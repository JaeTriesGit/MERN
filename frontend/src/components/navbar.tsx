import { User } from '../models/user'
import NavbarLogged from './navbarlogged'
import NavbarLoggedOut from './navbarloggedout'

interface Navprops{
    LoggedUser: User | null,
    onSignUpClicked: () => void,
    onLogInClicked: () => void,
    onSignOut: () => void
}

const Navbar = ({LoggedUser, onSignUpClicked, onLogInClicked, onSignOut} : Navprops) => {

    return(
        <div className='Navbar'>
            <p className='NavbarTitle'>Epic Notes</p>
            {LoggedUser ? 
            <NavbarLogged user={LoggedUser} onLogout={onSignOut}/>
            :
            <NavbarLoggedOut onSignUp={onSignUpClicked} onLogIn={onLogInClicked}/>}
        </div>
    )
}

export default Navbar