import { User } from '../models/user'
import NavbarLogged from './navbarlogged'
import NavbarLoggedOut from './navbarloggedout'
import Logo from '../images/logo.svg'

interface Navprops{
    LoggedUser: User | null,
    onSignUpClicked: () => void,
    onLogInClicked: () => void,
    onSignOut: () => void
}

const Navbar = ({LoggedUser, onSignUpClicked, onLogInClicked, onSignOut} : Navprops) => {

    return(
        <div className='Navbar'>
            <div className='Top-Left'>
                <img className='Logo' src={Logo}/>
                <p className='NavbarTitle'>Epic Notes</p>
            </div>
            {LoggedUser ? 
            <NavbarLogged user={LoggedUser} onLogout={onSignOut}/>
            :
            <NavbarLoggedOut onSignUp={onSignUpClicked} onLogIn={onLogInClicked}/>}
        </div>
    )
}

export default Navbar