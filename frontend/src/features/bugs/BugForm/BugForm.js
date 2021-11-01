import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory, useParams } from 'react-router'
import { Alert } from 'reactstrap'
import { makeNewBug } from '../bugSlice'
import { getPriorities, priorityLevel } from '../BugComponents/priorityController'
import BugRadio from '../BugComponents/BugRadio'
import './BugForm.css'


export default function BugForm() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [errors, setErrors] = useState([])
  const [alerts, setAlerts] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [bug, setBug] = useState({})
  const bugs = Object.values(useSelector(state=>state.bugs.entities))
  const users = Object.values(useSelector(state=>state.users.entities))
  const currentUser = useSelector(state=>state.session.currentUser)
  setIsAdmin(currentUser.admin)
  const { bId } = useParams()
  const getBug = () => {
    if (bId===0){
      return {name: '', details: '', steps: '', priority: '', createdBy: bId, createdAt: new Date.UTC(), updatedAt: new Date.UTC(), version: ''}
    } else {
      return bugs[bId - 1]
    }
  }
  setBug(getBug())
  const createdBy = users[bug.createdBy-1]
  const {color, level} = getPriorities(bug.priority)
 
  const handleSubmit = async (e) => {
    e.target.preventDefault()
    const res = await dispatch(makeNewBug(bug))
    if(res.ok){
      return (<Redirect to='/home'/>)
    } else {
      setErrors(res.errors)
    }
  }

  const makeIcons = () => {
    const bugIcons = []
    for(let x=1;x<=4;x++){
      bugIcons.push(<BugRadio priority={bug.priority} index={x} key={x}/>)
    }
    return bugIcons
  }
  
  const closeView = () => {  
    return history.push('/viewbugs')
  }

  const handleErrors = (errs) => {
    return (errs.map((error, idx)=> (
      <Alert color="danger" toggle={alerts} key={idx}>{error.error}</Alert>
    ))).then((res) => {
      setAlerts(true)
      return res
    } )
  }
  
  return (
    <form onSubmit={handleSubmit} method='POST'>
      <div className="page-container lg-bug">
        <div className="lg-bug-card">
          {(errors.length >= 1) && handleErrors(errors)}
          <div className="lg-bug-card-header">
            <div className="lg-bug-card-hdr-btns">
            </div>
            <h1 className="lg-bug-card-header-title" style={{color}}>
              <input
              className="bc-input-form-text b1-name"
              type="text"
              name="name"
              value={bug.name}
              placeholder={bug.name}
              onChange={(e) => bug.name = e.target.value}
              />
            </h1>
            <button className="lg-bug-card-hdr-close bug-view-btn" onClick={(e) => closeView(e)}>X</button>
          </div>
          <div className="lg-bug-card-container">
            <div className="lg-bug-card-long-div card-bc2">
              <h1 className="lg-bug-card-long-div-text">DETAILED DESCRIPTION</h1>
              <div className="lg-bug-card-long-div-divider div-bc2"></div>
              <input 
              className="bc-input-form-text b2-details" 
              value={bug.details}
              placeholder={bug.details}
              type="textarea"
              name="details"
              onChange={(e) => bug.details = e.target.value}
              />
            </div>
            <div className="lg-bug-card-image">
              img feature coming soon
            </div>
            <div className="lg-bug-card-long-div card-bc3">
              <h1 className="lg-bug-card-long-div-text">STEPS TO REPLICATE</h1>
              <div className="lg-bug-card-long-div-divider div-bc3"></div>
              <input 
              className="bc-input-form-textarea b3-card" 
              value={bug.steps}
              placeholder={bug.steps}
              type="textarea"
              name="steps"
              onChange={(e) => bug.steps = e.target.value}
              />
            </div>
            <div className="lg-bug-card-long-half bc4">
              <h3 className="lg-bug-card-long-div-text">CREATED AT</h3>
              <div className="lg-bug-card-long-div-divider div-bc4"></div>
              <p className="bc-text bc4-txt">{bug.createdAt}</p>
            </div>
            <div className="lg-bug-card-long-half bc5">
              <h3 className="lg-bug-card-long-div-text">CREATED BY</h3>
              <div className="lg-bug-card-long-div-divider div-bc5"></div>
              <p className="bc-text bc5-txt">{createdBy.name}</p>
            </div>
            <div className="lg-bug-card-short-half bc6">
              <h3 className="lg-bug-card-long-div-text">ASSIGNED TO</h3>
              <div className="lg-bug-card-long-div-divider div-bc6"></div>
              <select 
              className="user-dropdown bug-input" 
              name="assignedTo" 
              disabled={isAdmin}
              id="assignedTo"
              form="bugForm"
              >
                {users.map((user)=>(
                  <option key={user.id} value={user.name} onSelect={(e)=>bug.assignedTo = e.target.value}>{user.name}</option>
                ))}  
              </select>
            </div>
            <div className="lg-bug-card-bottom">
              <button type="submit" onClick={(e)=> handleSubmit(e)} className="lg-bug-card-btn-link ">
                SUBMIT THIS BUG
              </button>
            </div>
            <div className="lg-bug-card-short-half bc6">
              <h3 className="lg-bug-card-long-div-text">OS VERSION</h3>
              <div className="lg-bug-card-long-div-divider div-bc6"></div>
              <input className="bc-text bc6-txt"/>
            </div>
            <div className="lg-bug-card-short-half bc7">
              <h3 className="lg-bug-card-long-div-text">PRIORITY</h3>
              <div className="lg-bug-card-long-div-divider div-bc7"></div>
              <h3 className="bc-text bc7-txt" ></h3>
            </div>
          </div>
        </div>
      </div>      
    </form>
  )
}
