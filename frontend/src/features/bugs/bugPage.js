import React, { useState } from 'react'
import { useSelector } from 'react-redux'
// import { bugSelectors } from './bugSlice'
import BugCard from './BugCard/BugCard'
// import { bugs } from '../../store'
import './bugs.css'
import BugForm from './BugForm/BugForm'
import { Modal } from '../../store/modal/Modal'

export default function BugPage() {
    // const dispatch = useDispatch()
    // useEffect(() =>{
    //     dispatch(fetchBugs())
    // }, [dispatch])
    const [showModal, setShowModal] = useState(false)
    const [modalBug, setModalBug] = useState({})
    
    const bugs = Object.values(useSelector(state => state.bugs.entities))

    const closingFunc = () =>{
        setShowModal(false)
        setModalBug({})
    }
    
    return (
        <div className="page-container">
            <div className="page-header">
                <p className="page-header-text">LIVE BUGS</p>
            </div>
            <div className="bug-card-container">
                {bugs.map((bug) => (
                    <BugCard bug={bug} key={bug.id} setModalBug={setModalBug} setShowModal={setShowModal}/>
                ))}
                {showModal && (
                    <Modal onClose={() => closingFunc()}>
                        <BugForm bug={modalBug} setShowModal={setShowModal}/>
                    </Modal>
                )}
            </div>
        </div>
    )
}
