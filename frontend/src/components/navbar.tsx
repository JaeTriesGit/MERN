import { User } from '../models/user'

interface Navprops{

}

const Navbar = () => {
    return(
        <div className='Navbar'>
            <div className='Controls'>
                <button className='Navbutton'>Sign Up</button>
                <button className='Navbutton'>Log In</button>
            </div>
        </div>
    )
}

export default Navbar