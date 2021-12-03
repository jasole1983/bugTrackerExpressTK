import React, { useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session'
import useMediaQuery from '../../store/hooks/MediaQuery';
import { BugContext } from '../../BugContext';
import './NavBar.css'
import BlankBug from '../bugs/BugComponents/blankBug'

export default function NavBar({ setIsLoaded }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const currentUser = useSelector((state)=>state.session.user)
  const [ showMenu, setShowMenu ] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [ bug, setBug ] = useContext(BugContext)
  const isDesktop = useMediaQuery('(min-width: 600px)')
  const setCont = () => {
    setBug({...BlankBug})
  }
  const signOut = () => {
    dispatch(sessionActions.logout())
    history.push("/login")
  }
  if(!currentUser) return (
    <Redirect to="/login" />
  )
  return (
        <div className="navbar">
          <div className="navbar-logo">
            <NavLink exact to="/home" className="navbar-link">
              <i className="bi bi-bug-fill" ></i>{isDesktop && "Yer Buggin' Me!"}
            </NavLink>
          </div>
          {isDesktop && 
          <>
            <div className="navbar-main">
              <div className="navbar-link main-item dashboard">
                <NavLink exact to="/dashboard" className="btn-link navbar-link">
                  Dashboard
                </NavLink>
              </div>
              <div className="navbar-link main-item view-bugs">
                <NavLink exact to="/viewbugs" className="btn-link navbar-link">
                  View Bugs
                </NavLink>
              </div>
              <div className="navbar-link main-item create-bug">
                <NavLink to={`/createbug`} className="btn-link navbar-link">
                  <button className="btn-link-navbar btn-link navbar-link" onClick={setCont} >
                    Create Bug
                  </button>
                </NavLink>
              </div>
            </div>
            <div className="navbar-user-control">
              <NavLink exact to={`/user/${currentUser? currentUser.id:'1'}`} className="usr-hstry-lnk navbar-link user-control">
                {currentUser? currentUser.userName:""}
              </NavLink>
              <button className="navbar-usr-ctrl-btn logout-btn navbar-link user-control" onClick={()=> signOut()} id="logoutbtn">
                Logout
              </button>
            </div>
          </>}
          {!isDesktop && <button className="mbl-hamburger" onClick={() => setShowMenu(!showMenu)}></button>}
          {(!isDesktop && showMenu) && 
            <ul className="mbl-nav-links">
              <li>
                <NavLink exact to="/dashboard" className="mbl-navbar-link m-db">
                  Dashboard
                </NavLink>
                <NavLink exact to="/viewbugs" className="mbl-navbar-link m-db">
                  View Bugs
                </NavLink>
                <NavLink exact to="/createbug" className="mbl-navbar-link m-db">
                  Create Bug
                </NavLink>
                <NavLink exact to={`/user/${currentUser? currentUser.id:"1"}`} className="mbl-navbar-link m-db">
                {currentUser? currentUser.name:""}
                </NavLink>
              </li>
            </ul>
            }
        </div>
    )
}
