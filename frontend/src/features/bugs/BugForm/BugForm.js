import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeNewBug } from '../bugSlice'

import BugRadio from '../BugComponents/BugRadio'
import './BugForm.css'



export default function LargeBugCard({ bug }) {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [steps, setSteps] = useState('')
    const [version, setVersion] = useState('')
    const [priority, setPriority] = useState(0)
    const [assignedTo, setAssignedTo] = useState('')
    const [createdBy, setCreatedBy] = useState(0)
    const users = Object.values(useSelector((state)=>state.users.entities))
    const creator = users[bug.createdBy-1].name
    const submitBug = (e) => {
      const newBug = {name, details, steps, version, assignedTo, createdBy, priority}
      e.target.preventDefault()
      dispatch(makeNewBug(newBug))
    }
    const makeIcons = () => {
      const bugIcons = []
      for(let x=1;x<=4;x++){
        bugIcons.push(<BugRadio priority={priority} index={x} setPriority={setPriority} key={x}/>)
      }
      
      return bugIcons
    }
  
    useEffect(()=>{
      setName(bug.name)
      setDetails(bug.details)
      setSteps(bug.steps)
      setVersion(bug.version)
      setPriority(bug.priority)
      setAssignedTo(bug.assignedTo)
      setCreatedBy(bug.createdBy)
    }, [])
    return (
      <form onSubmit={(e) => submitBug(e)} id="bugform">
        <div className="large-bug-card">
          <div className="large-bug-title lb-col">
            <label className="bug-form-label" htmlFor='name'>Name:</label>
            <input 
                className="bug-input"
                name="name"
                type="textarea"
                placeholder={bug.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
            /> 
          </div>
          <div className="lb-col1 lb-col">
            <label className="bug-form-label left-labels">Details:</label>
            <textarea
              className="bug-input"
              name="details"
              type="textarea"
              placeholder={bug.details}
              row="2"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            ></textarea>
          </div>
          <div className="lb-col2 lb-col">
            <label className="bug-form-label left-labels">Steps:</label>
            <textarea
              className="bug-input"
              name="steps"
              row="2"
              type="textarea"
              placeholder={bug.steps}
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
            ></textarea>
          </div>
          <div className="lb-col3 lb-col">
            <label className="bug-form-label">Version:</label>
            <input
              className="bug-input"
              name="version"
              type="text"
              id="version-input"
              placeholder={bug.version}
              value={version}
              onChange={(e) => setVersion(e.target.value)}
            />
          </div>
          <div className="lb-col4 lb-col">
            <label className="bug-form-label">Priority:</label>
            <div className="bug-form-priority-container">
              <div className="bug-form-priority-icon-container">
                {makeIcons()}
              </div>
            </div>
          </div>
          <div className="lb-col5 lb-col">
            <label className="bug-form-label">Assign To:</label>
            <select className="user-dropdown bug-input" name="assignedto" id="assignedto" form="bugform">
              {users.map((user)=>(
                <option key={user.id} value={user.name} onSelect={(e)=>setAssignedTo(e.target.value)}>{user.name}</option>
              ))}
            </select>
          </div>
          <div className="lb-col6 lb-col">
            <label className="bug-form-label">Created By: {creator}</label>
            <input
              className="bug-input"
              name="createdBy"
              type="hidden"
              disabled="true"
              value={createdBy}              
            />
          </div>
          <div className="lb-col7 lb-col">
          <iframe src="https://www.zeitverschiebung.net/clock-widget-iframe-v2?language=en&size=medium&timezone=America%2FLos_Angeles&show=hour_minute" width="100%" height="115" frameborder="0" seamless title="uniquetitle"></iframe>
          </div>
        </div>
        <div className="lb-footer lb-col">
          <button className="large-bug-submit-btn lb-footer" type="submit">CREATE / UPDATE BUG</button>
        </div>
      </form>    
    )
}
                  

                

                

                
