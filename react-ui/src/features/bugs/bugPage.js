import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import BugCard from './BugCard/BugCard'
import './bugs.css'
import { BugContext } from '../../BugContext'
import BugModal from './BugComponents/BugModal'

export default function BugPage() {
    const bugs = useSelector(state => state.bugs.entities)
    const bugList = Object.values(bugs)

    // eslint-disable-next-line no-unused-vars
    const [ bug, setBug ] = useContext(BugContext)
    const [ showModal, setShowModal ] = useState(false)
    const setBugContext = (b) => {
        setBug({...b})
        setShowModal(true)
    }

    return (
        <div className="page-container bug-page-cont bugs">
            <div className="page-header bug-page-hdr bugs">
                <h1 className="page-header-txt bug-page-hdr-txt">
                    LIVE BUGS
                </h1>
            </div>
            
            <div className="bug-card-container">
                {bugList.map((bugg) => (
                  <button className="bug-card-btn" onClick={() => setBugContext(bugg)} key={(bugg.id).toString()} >
                    <BugCard bug={bugg}  />
                  </button>
                ))}
            </div>
            {showModal &&
                <BugModal showModal={showModal} setShowModal={setShowModal} />
            }
        </div>
    )
}
