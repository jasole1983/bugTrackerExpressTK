import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Button } from 'reactstrap'
import { useHistory } from 'react-router'
import * as sessionActions from '../../store/session'
import './NavBar.css'

export default function NavBar({ setIsLoaded }) {
  const currentUser = useSelector((state)=>state.session.user)
  const history = useHistory()
  const signOut = () => {
    sessionActions.logout()
    history.push('/')
    setIsLoaded(false)
  }
    return (
      <div>
        <div className="navbar">
          <div className="navbar-logo"><NavLink exact to="/home" className="navbar-toggler"><i className="bi bi-bug-fill" ></i>Yer Buggin' Me!</NavLink></div>
          <div className="navbar-main">
            <div className="navbar-main-item-btn navbar-toggler" >
              <NavLink exact to="/dashboard" className="btn-link navbar-toggler">
                Dashboard
              </NavLink>
            </div>
            <div className="navbar-main-item-btn navbar-toggler" >
              <NavLink exact to="/viewbugs" className="btn-link navbar-toggler">
                View Bugs
              </NavLink>
            </div>
            <div className="navbar-main-item-btn navbar-toggler" >
              <NavLink to={`/createbug`} className="btn-link navbar-toggler">
                Create Bug
              </NavLink>
            </div>
          </div>
          <div className="navbar-user-control">
            <Button className="navbar-usr-ctrl-btn user-page" id="userhistory">
              <NavLink exact to={`/user/${currentUser? currentUser.id:999}`} className="usr-hstry-lnk">
                {currentUser? currentUser.name:"Default User"}
              </NavLink>
            </Button>
            <Button className="navbar-usr-ctrl-btn logout-btn" onClick={()=> signOut()} id="logoutbtn">
              Logout
            </Button>
          </div>       
        </div>
      </div>
    )
}
