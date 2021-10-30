import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Button, Navbar, NavbarBrand, NavbarToggler } from 'reactstrap'
import * as sessionActions from '../../store/session'
import './NavBar.css'

export default function NavBar({ setIsLoaded }) {
  const currentUser = useSelector(state=>state.session.user)
  const signOut = () => {
    sessionActions.logout()
    setIsLoaded(false)
  }
    return (
      <div>
        <Navbar className="navbar">
          <NavbarBrand className="navbar-logo"><i className="bi bi-bug-fill" ></i>Yer Buggin' Me!</NavbarBrand>
          <div className="navbar-main">
            <NavbarToggler className="navbar-main-item-btn navbar-toggler" >
              <NavLink exact to="/dashboard" className="btn-link navbar-btn">
                Dashboard
              </NavLink>
            </NavbarToggler>
            <NavbarToggler className="navbar-main-item-btn navbar-toggler" >
              <NavLink exact to="/viewbugs" className="btn-link navbar-btn">
                View Bugs
              </NavLink>
            </NavbarToggler>
            <NavbarToggler className="navbar-main-item-btn navbar-toggler" >
              <NavLink exact to="/creatbugs" className="btn-link navbar-btn">
                Create Bug
              </NavLink>
            </NavbarToggler>
          </div>
          <div className="navbar-user-control">
            <Button className="navbar-usr-ctrl-btn user-page" id="userhistory">
              <NavLink exact to={`/user/${currentUser? currentUser.id: 1}`} className="usr-hstry-lnk">
                {currentUser? currentUser.name:'Demo Miire'}
              </NavLink>
            </Button>
            <Button className="navbar-usr-ctrl-btn logout-btn" onClick={()=> signOut()} id="logoutbtn">
              Logout
            </Button>
          </div>       
        </Navbar>
      </div>
    )
}
