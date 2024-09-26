import {Link} from 'react-router-dom';
import './NavBar.css'
import searchIcon from '../../asset/search_icon.png'
function NavBar(props){
    return(
        <nav className = "navbar">
            <div className = 'logo'>
                <h1>LOGO</h1>
            </div>
            <div className = 'nav-button'>
                <Link to = '/'>
                    <div className = 'img-container'>
                        <img src = {searchIcon} className = 'search-icon'/>
                    </div>
                </Link>
                {
                    // props.loggedIn &&
                    <Link to = '/dashboard'>
                        <button className = 'dashboard-btn'>DashBoard</button>
                    </Link>
                }
                {
                    props.loggedIn?
                    <button className = 'logout-btn' onClick = { props.onLogOut }>LogOut</button>
                    :
                    <Link to = '/login'>
                        <button className = 'login-btn'>Login</button>
                    </Link>
                }
            </div>
        </nav>
    )
}
export default NavBar;