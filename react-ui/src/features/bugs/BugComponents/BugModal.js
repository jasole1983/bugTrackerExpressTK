import React, { useState } from 'react'
import { Modal } from '../../../store/modal/Modal'
import ReactCardFlip from 'react-card-flip'
import BugView from '../BugView/BugView'
import BugForm from '../BugForm/BugForm'

export default function BugModal({showModal, setShowModal}) {
  const [ isFlipped, setIsFlipped ] = useState(false)
  const onClose = () => {
    setShowModal(false)
    setIsFlipped(false)
  }
    return (
        <Modal backdropClassName="bug-view-backdrop" isOpen={showModal} onClose={onClose}>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <BugView setShowModal={setShowModal} setIsFlipped={setIsFlipped} isFlipped={isFlipped} />
                <BugForm setShowModal={setShowModal} setIsFlipped={setIsFlipped} isFlipped={isFlipped} />
            </ReactCardFlip>
        </Modal>  
    )
}
