import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Modal } from 'reactstrap'
import { Redirect } from 'react-router'
import ReactCardFlip from 'react-card-flip'
import BackgroundSlider from 'react-background-slider'
import LoginFormPage from '../LoginFormPage'
import SignupFormPage from '../SignupFormPage'
import { images } from '../../../../images/images'
import './LoginPage.css'


export default function LoginPage() {
  const currentUser = useSelector((state) => state.session.user)
  const [isFlipped, setIsFlipped] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const loginClick = () => {
    setShowModal(true)
  }
  if (currentUser) {
    return <Redirect to='/'/>
  }
  return (
    <div className="page-container log-page">
        <button className="login-button" onClick={()=>loginClick()}>LOGIN</button>
        <div className="bg-slider-container">
          
            <BackgroundSlider
              images={images}
              duration={10}
              transition={2}
              />
        </div>
        <Modal backdropClassName="login-modal-backdrop" isOpen={showModal} toggle={() => loginClick()} centered>
          <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <LoginFormPage setIsFlipped={setIsFlipped} isFlipped={isFlipped} setShowModal={setShowModal} />
            <SignupFormPage setIsFlipped={setIsFlipped} isFlipped={isFlipped} setShowModal={setShowModal}/>
          </ReactCardFlip>
        </Modal>
      </div>
    )
}
