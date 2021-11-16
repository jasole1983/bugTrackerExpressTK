import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Redirect, useHistory, useParams } from 'react-router'
import { NavLink } from 'react-router-dom'
import { getPriorities, priorityLevel } from '../BugComponents/priorityController'
import { delBug } from '../bugSlice'
import staticImage from '../../../images/demoSS.jpg'
import './BugView.css'

export default function BugView() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [errors, setErrors] = useState([])
  const [alerts, setAlerts] = useState(false)
  const bugs = Object.values(useSelector(state=>state.bugs.entities))
  const users = Object.values(useSelector(state=>state.users.entities))
  const { bugId } = useParams()
  const bug = bugs[bugId-1]
  const assignedTo = users[bug.assignedTo-1]
  const createdBy = users[bug.createdBy-1]
  const {color, level} = getPriorities(bug.priority)
  const bugIcons = priorityLevel(bug.priority)
  const createdAt = () => {
    const time = new Date(bug.createdAt)
    return time.toLocaleDateString() + ' ' + time.toLocaleTimeString()
  }
  const editBug = () => {
    
    return <Redirect to={`/createBug/${bugId}`} />
  }

  const closeView = () => {
    
    return history.push('/viewbugs')
  }

  const deleteThisBug = async () => {
    
    const res = await dispatch(delBug(bug))
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
        <div className="lg-bug-card-header">
          <div className="lg-bug-card-hdr-btns">
            <button className="lg-bug-card-hdr-edit bug-view-btn" onClick={ editBug}>EDIT</button>
            <button className="lg-bug-card-hdr-del bug-view-btn" onClick={deleteThisBug}>DELETE</button>
          </div>
          <h1 className="lg-bug-card-header-title lg-bug-label">
            NAME: 
          </h1>
          <h1 className="lg-bug-card-header-title" style={{color}}>
            {bug.name}
          </h1>
          <button className="lg-bug-card-hdr-close bug-view-btn" onClick={(e) => closeView(e)}>X</button>
        </div>
        <div className="lg-bug-card-container">
          <div className="lg-bug-card-long-div bc1">
            <h1 className="lg-bug-card-long-div-text">DETAILED DESCRIPTION</h1>
            <div className="lg-bug-card-long-div-divider div-bc1"></div>
            <p className="bc-text bc1-txt">{bug.details}</p>
          </div>
          <div className="lg-bug-card-image">
            <img
             src={staticImage} 
             alt="demo screenshot"
             style={{ height: "400px", paddingRight: "10px" }}
             />
          </div>
          <div className="lg-bug-card-long-div bc2">
            <h1 className="lg-bug-card-long-div-text">STEPS TO REPLICATE</h1>
            <div className="lg-bug-card-long-div-divider div-bc2"></div>
            <p className="bc-text bc2-txt">{bug.steps}</p>
          </div>
          <div className="lg-bug-card-long-half bc3">
            <h3 className="lg-bug-card-long-div-text">CREATED AT</h3>
            <div className="lg-bug-card-long-div-divider div-bc3"></div>
            <p className="bc-text bc3-txt">{createdAt()}</p>
          </div>
          <div className="lg-bug-card-long-half bc4">
            <h3 className="lg-bug-card-long-div-text">CREATED BY</h3>
            <div className="lg-bug-card-long-div-divider div-bc4"></div>
            <p className="bc-text bc4-txt">{createdBy.name}</p>
          </div>
          <div className="lg-bug-card-short-half bc5">
            <h3 className="lg-bug-card-long-div-text">ASSIGNED TO</h3>
            <div className="lg-bug-card-long-div-divider div-bc5"></div>
            <p className="bc-text bc5-txt">{assignedTo.name}</p>
          </div>
          <div className="lg-bug-card-bottom">
            <NavLink to={`/complete/${bug.id}`} className="lg-bug-card-btn-link nav-link navlink">
              COMPLETE THIS BUG
            </NavLink>
          </div>
          <div className="lg-bug-card-short-half bc6">
            <h3 className="lg-bug-card-long-div-text">OS VERSION</h3>
            <div className="lg-bug-card-long-div-divider div-bc6"></div>
            <p className="bc-text bc6-txt">{bug.version}</p>
          </div>
          <div className="lg-bug-card-short-half bc7">
            <h3 className="lg-bug-card-long-div-text">PRIORITY</h3>
            <div className="lg-bug-card-long-div-divider div-bc7"></div>
            <h3 className="bc-text bc7-txt" style={{color}}>{level}  {bugIcons}</h3>
          </div>
        </div>
      </div>
      
    </div>
  )
}
