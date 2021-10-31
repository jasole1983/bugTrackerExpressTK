import React, { useState } from 'react'
import { useSelector } from 'react-redux'
// import { bugSelectors } from './bugSlice'
import BugCard from './BugCard/BugCard'
// import { bugs } from '../../store'
import './bugs.css'
import BugForm from './BugForm/BugForm'
import { Modal } from 'reactstrap'

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
        <div className="page-container bugs">
            <div className="page-header bugs">
                <h1 className="page-header-text">LIVE BUGS</h1>
            </div>
            <div className="bug-card-container">
                {bugs.map((bug) => (
                    <BugCard bug={bug} key={bug.id} setModalBug={setModalBug} setShowModal={setShowModal}/>
                ))}
            </div>
              <Modal isOpen={showModal} 
              toggle={() => closingFunc()} 
              centered={true}
              modalClassName="bug-card-large-view" 
              scrollable={true}>
                <BugForm bug={modalBug} setShowModal={setShowModal}/>
              </Modal>
              
        </div>
    )
}
