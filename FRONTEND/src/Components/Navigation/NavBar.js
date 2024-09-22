import {Link} from 'react-router-dom';
import './NavBar.css'
function NavBar(props){
    return(
        <nav className = "navbar">
            {
                props.loggedIn?
                <button onClick = { props.onLogOut }>LogOut</button>
                :
                <Link to = '/login'>
                    <button>Login</button>
                </Link>
            }
            <Link to = '/'>
                <button>Search</button>
            </Link>
        </nav>
    )
}
export default NavBar;