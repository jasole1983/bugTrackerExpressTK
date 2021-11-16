import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '../../../../store/modal/Modal'
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
  const onClose = () => {
    setShowModal(false)
    setIsFlipped(false)
  }
  if (currentUser) {
    return <Redirect to='/home'/>
  }
  return (
    <div className="page-container log-page">
      <div className="button-container">
        <button className="login-button" onClick={()=>setShowModal(!showModal)}>LOGIN</button>
        <button className="login-button demo" onClick={demoLogin}>DEMO</button>
      </div>
      <div className="modal-container" >
        {showModal && 
          <Modal backdropClassName="login-modal-backdrop" isOpen={showModal} onClose={onClose} centered>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
              <LoginFormPage setIsFlipped={setIsFlipped} isFlipped={isFlipped} setShowModal={setShowModal} />
              <SignupFormPage setIsFlipped={setIsFlipped} isFlipped={isFlipped} setShowModal={setShowModal}/>
            </ReactCardFlip>
          </Modal>}
      </div>
    </div>
    )
}
