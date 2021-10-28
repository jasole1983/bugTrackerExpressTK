import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import "./NavBar.css"
import { Modal } from '../../store/modal/Modal'
import LargeBugCard from '../../features/bugs/LargeBugCard'
// import Bug from '../../images/'


export default function NavBar() {
  const [showModal, setShowModal] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)  
  const currentUser = useSelector(state=>state.session.user)
  
  const closingFunc = () => {
    setShowModal(false)
  }
  let blankBug
  let user;
  if (loggedIn) {
    user = (
      <>  
        <NavLink exact to={`/user/${currentUser.id}`} className="navbar-dropdown">
          {currentUser.name}
        </NavLink>
        <NavLink exact to="/logout" className="navbar-dropdown">
           /Logout
        </NavLink>
      </>
    )
    blankBug = {name: '',
                details: '',
                steps: '',
                version: '',
                priority: 0,
                assignedTo: 0,
                createdBy: currentUser.id || 5}
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
            <button className="navbar-btn" onClick={()=>setShowModal(true)}>
              Create Bug
            </button>
            {showModal && (
              <Modal onClose={()=>closingFunc()}>
                <LargeBugCard bug={blankBug} setShowModal={setShowModal}/>
              </Modal>
            )}
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
