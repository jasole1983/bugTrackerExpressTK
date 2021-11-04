import React, { useEffect, useState, crea } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DragAndDropComp from '../../DragAndDrop/DragAndDrop'
import BugRadio from '../BugComponents/BugRadio'
import { makeNewBug } from '../bugSlice'
import './BugForm.css'

export default function BugForm(props) {
  const [ newBug, setNewBug ] = useState({})
  const users = Object.values(useSelector(state=>state.users))
  const dispatch = useDispatch()
  const submitNewBug = (e) => {
    e.target.preventDefault()
    dispatch(makeNewBug(newBug))
  }
  useEffect(() => {
    setNewBug({name: '', details: '', steps: '', priority: '', createdBy: props.currentUser, createdAt: Date.UTC(), updatedAt: Date.UTC(), version: ''})
  }, [props.currentUser])
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
                value={newBug.name}
                placeholder="Brief Description of the Bug"
                onChange={(e) => setNewBug({name: e.target.value})}
                />
            </div>
            <div className="lg-bug-card-container-new">
              <div className="lg-bug-card-long-div card-bc1">
                <h1 className="lg-bug-card-long-div-text">DETAILED DESCRIPTION</h1>
                <div className="lg-bug-card-long-div-divider div-bc1"></div>
                <input 
                className="bc-input-form-text bug-input area b1-details" 
                value={newBug.details}
                placeholder="Type Description Here"
                type="textarea"
                name="details"
                row={4}
                onChange={(e) => setNewBug({details: e.target.value})}
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
                value={newBug.steps}
                placeholder="Type the steps to replicate bug"
                type="textarea"
                name="steps"
                onChange={(e) => setNewBug({steps: e.target.value})}
                />
              </div>
              <div className="lg-bug-card-long-half card-bc5">
                <h3 className="lg-bug-card-long-div-text">CREATED AT</h3>
                <div className="lg-bug-card-long-div-divider div-bc5"></div>
                <p className="bc-text bc4-txt">{newBug.createdAt}</p>
              </div>
              <div className="lg-bug-card-long-half card-bc4">
                <h3 className="lg-bug-card-long-div-text">CREATED BY</h3>
                <div className="lg-bug-card-long-div-divider div-bc4"></div>
                <p className="bc-text bc5-txt">{props.currentUser.name}</p>
              </div>
              <div className="lg-bug-card-short-half card-bc3">
                <h3 className="lg-bug-card-long-div-text">ASSIGNED TO</h3>
                <div className="lg-bug-card-long-div-divider div-bc3"></div>
                <label for="assignedTo" className="select-dropdown-input assignedTo">Select User To Assign</label>
                <select 
                className="user-dropdown bug-input" 
                name="assignedTo" 
                id="assignedTo"
                form="bugForm"
                >
                  {users.map((user, idx)=>(
                    <option key={idx} className="select-option" value={user.name} onSelect={(e)=>newBug.assignedTo = e.target.value}>{user.name}</option>
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
                value={newBug.version}
                placeholder="Version Here"
                type="text"
                name="version"
                onChange={(e) => setNewBug(newBug.version = e.target.value)}
                />
              </div>
              <div className="lg-bug-card-short-half card-bc7" id="divbc7">
                <BugRadio index={1} key={1}/>
                <BugRadio index={2} key={2}/>
                <BugRadio index={3} key={3}/>
                <BugRadio index={4} key={4}/>
              </div>
            </div>
        </form>
      </div>
    </div>
  )
}
