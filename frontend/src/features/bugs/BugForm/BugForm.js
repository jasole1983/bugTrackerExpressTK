import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import DragAndDropComp from '../../DragAndDrop/DragAndDrop'
import BugRadio from '../BugComponents/BugRadio'
import { makeNewBug } from '../bugSlice'
import './BugForm.css'

export default function BugForm() {
  const history = useHistory()
  const currentUser = useSelector(state=>state.session.user)
  const [ name, setName ] = useState('')
  const [ details, setDetails ] = useState('')
  const [ steps, setSteps ] = useState('')
  const [ priority, setPriority ] = useState(0)
  const [ assignedTo, setAssignedTo ] = useState(0)
  const [ version, setVersion ] = useState('')
  const currentTime = Date().toLocaleString().slice(0, 25)
  const users = Object.values(useSelector(state=>state.users.entities))
  const dispatch = useDispatch()
  const submitNewBug = async (e) => {
    e.preventDefault()
    console.log({name, details, steps, priority, assignedTo, version})
    const res = await dispatch(makeNewBug({
                          name,
                          details,
                          steps,
                          priority,
                          assignedTo,
                          version,
                          createdBy: currentUser.id,
                        }))
    if (res.ok) return history.push('/home')
  }
  return (
    <div className="page-container create-bug">
        <div className="lg-bug-card">
          <form onSubmit={submitNewBug} method='POST'>
            <div className="lg-bug-card-header input-card">
              <h1 className="lg-bug-card-header-title input-card">NAME</h1>
                <input
                className="bc-input-form-text name-input"
                type="text"
                name="name"
                value={name}
                placeholder="Brief Description of the Bug"
                onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="lg-bug-card-container-new">
              <div className="lg-bug-card-long-div card-bc1">
                <h1 className="lg-bug-card-long-div-text">DETAILED DESCRIPTION</h1>
                <div className="lg-bug-card-long-div-divider div-bc1"></div>
                <input 
                className="bc-input-form-text bug-input area b1-details" 
                value={details}
                placeholder="Type Description Here"
                type="textarea"
                name="details"
                row={4}
                onChange={(e) => setDetails(e.target.value)}
                />
              </div>
              <div className="lg-bug-card-image">
                <DragAndDropComp />
              </div>
              <div className="lg-bug-card-long-div card-bc2">
                <h1 className="lg-bug-card-long-div-text">STEPS TO REPLICATE</h1>
                <div className="lg-bug-card-long-div-divider div-bc2"></div>
                <textarea 
                className="bc-input-form-text bug-input area b2-card" 
                value={steps}
                placeholder="Type the steps to replicate bug"
                type="textarea"
                name="steps"
                onChange={(e) => setSteps(e.target.value)}
                />
              </div>
              <div className="lg-bug-card-long-half card-bc5">
                <h3 className="lg-bug-card-long-div-text">CREATED AT</h3>
                <div className="lg-bug-card-long-div-divider div-bc5"></div>
                <p className="bc-text bc4-txt">{currentTime}</p>
              </div>
              <div className="lg-bug-card-long-half card-bc4">
                <h3 className="lg-bug-card-long-div-text">CREATED BY</h3>
                <div className="lg-bug-card-long-div-divider div-bc4"></div>
                <p className="bc-text bc5-txt">{currentUser.name}</p>
              </div>
              <div className="lg-bug-card-short-half card-bc3">
                <h3 className="lg-bug-card-long-div-text">ASSIGNED TO</h3>
                <div className="lg-bug-card-long-div-divider div-bc3"></div>
                <label for="assignedTo" className="select-dropdown-input assignedTo">Select User To Assign</label>
                <select 
                className="user-dropdown bug-input" 
                name="assignedTo" 
                value={assignedTo}
                id="assignedTo"
                form="bugForm"
                onChange={(e)=>setAssignedTo(e.target.value)}
                >
                  {users.map((user, idx)=>(
                    <option key={idx} className="select-option" value={user.id}
                    >{user.name}</option>
                  ))}  
                </select>
              </div>
              <button type="submit" className="lg-bug-card-btn-link-edit ">
                SUBMIT THIS BUG
              </button>
              <div className="lg-bug-card-short-half card-bc6">
                <h3 className="lg-bug-card-long-div-text">OS VERSION</h3>
                <div className="lg-bug-card-long-div-divider div-bc6"></div>
                <input 
                className="bc-input-form-text bug-input b6-card" 
                value={version}
                placeholder="Version Here"
                type="text"
                name="version"
                onChange={(e) => setVersion(e.target.value)}
                />
              </div>
              <div className="lg-bug-card-short-half card-bc7" id="divbc7">
                <BugRadio index={1} key={1} setPriority={setPriority}/>
                <BugRadio index={2} key={2} setPriority={setPriority}/>
                <BugRadio index={3} key={3} setPriority={setPriority}/>
                <BugRadio index={4} key={4} setPriority={setPriority}/>
              </div>
            </div>
        </form>
      </div>
    </div>
  )
}
