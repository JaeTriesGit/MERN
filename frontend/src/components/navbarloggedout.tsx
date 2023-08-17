interface NavpropsLoggedOut{
    onSignUp: () => void,
    onLogIn: () => void
}

const NavbarLoggedOut = ({onSignUp, onLogIn} : NavpropsLoggedOut) => {

    return(
        <div className='NavControls'>
            <button className='Navbutton' onClick={onSignUp}>Sign Up</button>
            <button className='Navbutton' onClick={onLogIn}>Log In</button>
        </div>
    )
}

export default NavbarLoggedOut