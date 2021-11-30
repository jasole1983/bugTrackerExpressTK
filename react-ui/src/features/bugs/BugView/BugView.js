import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Redirect, useHistory, useParams } from 'react-router'
import { NavLink } from 'react-router-dom'
import { getPriorities, priorityLevel } from '../BugComponents/priorityController'
import { delBug } from '../bugSlice'
import './BugView.css'

export default function BugView() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [errors, setErrors] = useState([])
  const [alerts, setAlerts] = useState(false)
  const bugs = Object.values(useSelector(state=>state.bugs.entities))
  const bugIds = Object.values(useSelector(state=>state.bugs.ids))
  const users = Object.values(useSelector(state=>state.users.entities))
  const userIds = Object.values(useSelector(state=>state.users.ids))
  const { bugId } = useParams()
  const bugIdx = bugIds.indexOf(Number(bugId))
  const currentBug = bugs[bugIdx]
  console.log(currentBug)
  const assignedTo = users[userIds.indexOf(currentBug.assignedTo)]
  const createdBy = users[userIds.indexOf(currentBug.createdBy)]
  const {color, level} = getPriorities(currentBug.priority)
  const bugIcons = priorityLevel(currentBug.priority)
  const createdAt = () => {
    const time = new Date(currentBug.createdAt)
    return time.toLocaleDateString() + ' ' + time.toLocaleTimeString()
  }
  const editBug = () => {
    
    return <Redirect to={`/editBug/${bugId}`} />
  }

  const closeView = () => {
    
    return history.push('/viewbugs')
  }

  const deleteThisBug = async () => {
    
    const res = await dispatch(delBug(currentBug))
    if (res.message){
      return history.goBack()
    }
    if (res.errors){
      setErrors([...errors, ...res.errors])
      return handleErrors(errors)
    }
  }

  const handleErrors = (errs) => {
    return (errs.map((error, idx)=> (
      <alert color="danger" toggle={alerts} key={idx}>{error.error}</alert>
    ))).then((res) => {
      setAlerts(true)
      return res
    } )
  }
  return (
    <div className="page-container lg-bug">
      <div className="lg-bug-card">
        {(errors.length >= 1) && handleErrors(errors)}
        <div className="lg-bc-hdr-div">
          <div className="lg-bc-hdr-btns">
            <button className="lg-bug-card-hdr-edit bug-view-btn" onClick={ editBug}>EDIT</button>
            <button className="lg-bug-card-hdr-del bug-view-btn" onClick={deleteThisBug}>DELETE</button>
          </div>
          <p className="lg-bc-hdr-ttl-label">
            NAME: 
          </p>
          <p className="lg-bug-card-header-title-var" style={{color}}>
            {currentBug.name}
          </p>
          <button className="lg-bug-card-hdr-close bug-view-btn" onClick={(e) => closeView(e)}>X</button>
        </div>
        <div className="lg-bc-top-cont">
          <div className="lg-bc-vert-cont">
            <div className="lg-bc-vert-div left">
              <p className="sub-ttl">DETAILED DESCRIPTION</p>
              <div className="below-sub-ttl-bar"></div>
              <p className="bc-body-txt">{currentBug.details}</p>
            </div>
            <div className="lg-bc-vert-div right">
              <p className="sub-ttl">STEPS TO REPLICATE</p>
              <div className="below-sub-ttl-bar"></div>
              <p className="bc-body-txt">{currentBug.steps}</p>
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
            <p className="bc-body-txt">{currentBug.version}</p>
          </div>
          <div className="lg-bc-wd-mini-div">
            <p className="sub-ttl">PRIORITY</p>
            <div className="below-sub-ttl-bar"></div>
            <p className="bc-body-txt priority-txt" style={{color}}>{level}  {bugIcons}</p>
          </div>
        </div>
        <div className="lg-bc-btm-div">
          <NavLink to={`/complete/${currentBug.id}`} className="complete-btn">
            COMPLETE THIS BUG
          </NavLink> 
        </div>
      </div>
      
    </div>
  )
}
