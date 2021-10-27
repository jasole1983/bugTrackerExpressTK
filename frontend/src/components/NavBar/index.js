import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'


export default function NavBar() {

  const [loggedIn, setLoggedIn] = useState(false)  
  const currentUser = useSelector(state=>state.session.user)
  
  let user;
  if (loggedIn) {
    user = currentUser.name
  } else {
    user = (
      <>
        <NavLink exact to="/login" className="navbar-dropdown">
          Login/
        </NavLink>
        <NavLink exact to="/signup" className="navbar-dropdown">
          Signup
        </NavLink>
      </>
    )
  }

  return (
    <div className="navbar">
      <div className="navbar-logo logo app-name">
        YER BUGGIN ME!      
      </div>
      <ul className="navbar-main">
        <li className="navbar-main-item">
          First
        </li>  
        <li className="navbar-main-item">
          Second
        </li>  
        <li className="navbar-main-item">
          Third
        </li>  
      </ul>
      <div className="navbar-dropdown">
        <div className="navbar-dropdown-title btn-link">
          {user}
        </div>

      </div>                 
    </div>
  )
}
