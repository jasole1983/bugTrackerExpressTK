import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import "./NavBar.css"
// import Bug from '../../images/'


export default function NavBar() {

  const [loggedIn, setLoggedIn] = useState(false)  
  const currentUser = useSelector(state=>state.session.user)
  
  let user;
  if (loggedIn) {
    user = (
      <>  
        <NavLink exact to="#" className="navbar-dropdown">
          currentUser.name
        </NavLink>
        <NavLink exact to="#" className="navbar-dropdown">
           / Logout
        </NavLink>
      </>
    )
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
        <NavLink exact to="#" className="btn-link navbar-btn">
          <i className="bi bi-bug-fill"></i>
            YER BUGGIN ME!      
        </NavLink>
      </div>
      <ul className="navbar-main">
        <li className="navbar-main-item navbar-btn">
          <div className="navbar-main-item-btn">
          
            <NavLink exact to="#" className="navbar-btn">
              Dashboard
            </NavLink>
          </div>
          
        </li>  
        <li className="navbar-main-item navbar-btn">
          <div className="navbar-main-item-btn">
            <NavLink exact to="/viewbugs" className="navbar-btn">
              View Bugs
            </NavLink>
          </div>
          
        </li>  
        <li className="navbar-main-item navbar-btn">
          <div className="navbar-main-item-btn">
          
            <NavLink exact to="#" className="navbar-btn">
              Create Bug
            </NavLink>
          </div>
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
