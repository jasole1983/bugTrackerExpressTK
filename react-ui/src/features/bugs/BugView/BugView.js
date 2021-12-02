import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getPriorities, priorityLevel } from '../BugComponents/priorityController'
import { delBug } from '../bugSlice'
import './BugView.css'
import { BugContext } from '../../../BugContext'
import useGetUser from '../../users/useGetUser'

export default function BugView({setShowModal, isFlipped, setIsFlipped}) {
  const dispatch = useDispatch()
  // eslint-disable-next-line no-unused-vars
  const [ bug, setBug ] = useContext(BugContext)
  const assignedTo = useGetUser(bug.assignedTo)
  const createdBy = useGetUser(bug.createdBy)
  const {color, level} = getPriorities(bug.priority)
  const bugIcons = priorityLevel(bug.priority)
  const createdAt = () => {
    const time = new Date(bug.createdAt)
    return time.toLocaleDateString() + ' ' + time.toLocaleTimeString()
  }

  const flipToEdit = () => {
    setIsFlipped(!isFlipped)
  }
  const closeView = () => {
    setShowModal(false)
  }

  const deleteThisBug = async () => { 
    const res = await dispatch(delBug(bug.id))
    console.log({res})
    setShowModal(false)
  }
  
  return (
    <div className="bug-view lg-bug">
      <div className="lg-bug-card">
        <div className="lg-bc-hdr-div">
          <div className="lg-bc-hdr-btns">
            <button className="lg-bug-card-hdr-edit bug-view-btn" onClick={flipToEdit}>EDIT</button>
            <button className="lg-bug-card-hdr-del bug-view-btn" onClick={deleteThisBug}>DELETE</button>
          </div>
          <p className="lg-bc-hdr-ttl-label">
            NAME: 
          </p>
          <p className="lg-bug-card-header-title-var" style={{color}}>
            {bug.name}
          </p>
          <button className="lg-bug-card-hdr-close bug-view-btn" onClick={(e) => closeView(e)}>X</button>
        </div>
        <div className="lg-bc-top-cont">
          <div className="lg-bc-vert-cont">
            <div className="lg-bc-vert-div left">
              <p className="sub-ttl">DETAILED DESCRIPTION</p>
              <div className="below-sub-ttl-bar"></div>
              <p className="bc-body-txt">{bug.details}</p>
            </div>
            <div className="lg-bc-vert-div right">
              <p className="sub-ttl">STEPS TO REPLICATE</p>
              <div className="below-sub-ttl-bar"></div>
              <p className="bc-body-txt">{bug.steps}</p>
            </div>
          </div>
          <div className="lg-bc-img-cont">
            <p className="img-txt">Image Placeholder</p>
          </div>
        </div>
        <div className="lg-bc-wide-div">
          <div className="lg-bc-wd-mini-div">
            <p className="sub-ttl">CREATED AT</p>
            <div className="below-sub-ttl-bar"></div>
            <p className="bc-body-txt">{createdAt()}</p>
          </div>
          <div className="lg-bc-wd-mini-div">
            <p className="sub-ttl">CREATED BY</p>
            <div className="below-sub-ttl-bar"></div>
            <p className="bc-body-txt">{createdBy.name}</p>
          </div>
          <div className="lg-bc-wd-mini-div">
            <p className="sub-ttl">ASSIGNED TO</p>
            <div className="below-sub-ttl-bar"></div>
            <p className="bc-body-txt">{assignedTo.name}</p>
          </div>
          <div className="lg-bc-wd-mini-div">
            <p className="sub-ttl">OS VERSION</p>
            <div className="below-sub-ttl-bar"></div>
            <p className="bc-body-txt">{bug.version}</p>
          </div>
          <div className="lg-bc-wd-mini-div">
            <p className="sub-ttl">PRIORITY</p>
            <div className="below-sub-ttl-bar"></div>
            <p className="bc-body-txt priority-txt" style={{color}}>{level}  {bugIcons}</p>
          </div>
        </div>
        <div className="lg-bc-btm-div">
          <NavLink to={`/complete/${bug.id}`} className="complete-btn">
            COMPLETE THIS BUG
          </NavLink> 
        </div>
      </div>
      
    </div>
  )
}
