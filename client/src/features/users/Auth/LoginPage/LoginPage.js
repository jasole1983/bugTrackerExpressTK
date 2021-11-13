import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'reactstrap'
import { Redirect, useHistory } from 'react-router'
import ReactCardFlip from 'react-card-flip'
import LoginFormPage from '../LoginFormPage'
import SignupFormPage from '../SignupFormPage'
import * as sessionActions from '../../../../store/session'
import './LoginPage.css'


export default function LoginPage({setIsLoggedIn}) {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.session.user)
  const history = useHistory()
  const [isFlipped, setIsFlipped] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const demoLogin = () => {
    console.log('demo button pushed')
    dispatch(sessionActions.login({name: "Devon Straight", email: "fake@email.com", id: 5, admin: true, password: 'password'}))
    if (currentUser) return history.push('/home')
  }
  if (currentUser) {
    return <Redirect to='/home'/>
  }
  return (
    <div className="page-container log-page">
      <button className="login-button" onClick={()=>setShowModal(!showModal)}>LOGIN</button>
      <button className="login-button demo" onClick={demoLogin}>DEMO</button>
      <Modal backdropClassName="login-modal-backdrop" isOpen={showModal} toggle={() => setShowModal(!showModal)} centered>
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
          <LoginFormPage setIsFlipped={setIsFlipped} isFlipped={isFlipped} setShowModal={setShowModal} />
          <SignupFormPage setIsFlipped={setIsFlipped} isFlipped={isFlipped} setShowModal={setShowModal}/>
        </ReactCardFlip>
      </Modal>
    </div>
    )
}
