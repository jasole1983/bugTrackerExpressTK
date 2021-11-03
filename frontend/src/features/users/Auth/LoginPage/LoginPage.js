import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'reactstrap'
import { Redirect, useHistory } from 'react-router'
import ReactCardFlip from 'react-card-flip'
import BackgroundSlider from 'react-background-slider'
import LoginFormPage from '../LoginFormPage'
import SignupFormPage from '../SignupFormPage'
import * as sessionActions from '../../../../store/session'
import { images } from '../../../../images/images'
import './LoginPage.css'
import { NavLink } from 'react-router-dom'


export default function LoginPage({setIsLoggedIn}) {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.session.user)
  const history = useHistory()
  const [isFlipped, setIsFlipped] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const demoLogin = () => {
    dispatch(sessionActions.login({name: "DevonStraight", email: "fake@email.com", id: 5, admin: true, password: 'password'}))
    setIsLoggedIn(true)
    history.push("/home")
    return 
  }
  if (currentUser) {
    return <Redirect to='/home'/>
  }
  return (
    <div className="page-container log-page">
      <button className="login-button" onClick={()=>setShowModal(!showModal)}>LOGIN</button>
      <button className="login-button demo" onClick={demoLogin}>DEMO</button>
      <div className="bg-slider-container">
        <BackgroundSlider
          images={images}
          duration={10}
          transition={2}
          />
      </div>
      <Modal backdropClassName="login-modal-backdrop" isOpen={showModal} toggle={() => setShowModal(!showModal)} centered>
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
          <LoginFormPage setIsFlipped={setIsFlipped} isFlipped={isFlipped} setShowModal={setShowModal} />
          <SignupFormPage setIsFlipped={setIsFlipped} isFlipped={isFlipped} setShowModal={setShowModal}/>
        </ReactCardFlip>
      </Modal>
    </div>
    )
}
