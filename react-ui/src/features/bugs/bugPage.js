import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import BugCard from './BugCard/BugCard'
import './bugs.css'
import { BugContext } from '../../BugContext'
import { Modal } from '../../store/modal/Modal'
import BugView from './BugView/BugView'
import BugForm from './BugForm/BugForm'
import ReactCardFlip from 'react-card-flip'

export default function BugPage() {
    const bugs = Object.values(useSelector(state => state.bugs.entities))    
    // eslint-disable-next-line no-unused-vars
    const [ bug, setBug ] = useContext(BugContext)
    const [ showModal, setShowModal ] = useState(false)
    const [ isFlipped, setIsFlipped ] = useState(false)
    const setBugContext = (e) => {
        const targetBug = bugs[Number(e.target.id)]
        setBug({...targetBug})
        setShowModal(true)
    }

    const onClose = () => {
        setShowModal(false)
        setIsFlipped(false)
    }
    return (
        <div className="page-container bugs">
            <div className="page-header bugs">
                <h1 className="page-header-txt">
                    LIVE BUGS
                </h1>
            </div>
            
            <div className="bug-card-container">
                {bugs.map((bugg) => (
                  <button key={bugg.id} className="bug-card-btn" onClick={setBugContext} id={bugg.id}>
                    <BugCard bug={bugg} />
                  </button>
                ))}
            </div>
            {showModal &&
            <Modal backdropClassName="bug-view-backdrop" isOpen={showModal} onClose={onClose} >
                <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                    <BugView setShowModal={setShowModal} setIsFlipped={setIsFlipped} isFlipped={isFlipped} />
                    <BugForm setShowModal={setShowModal} setIsFlipped={setIsFlipped} isFlipped={isFlipped} />
                </ReactCardFlip>
            </Modal>            
            }
        </div>
    )
}
