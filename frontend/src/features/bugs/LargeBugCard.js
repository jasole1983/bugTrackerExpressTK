import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeNewBug } from './bugSlice'
import './bugs.css'

export default function LargeBugCard({ bug }) {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [steps, setSteps] = useState('')
    const [version, setVersion] = useState('')
    const [priority, setPriority] = useState(0)
    const [assignedTo, setAssignedTo] = useState('')
    const [createdBy, setCreatedBy] = useState('')

    const setBugIcons = () => {
      const iconList = []
      let icons = 0
      while(icons < 4){
        if (icons < priority){
          iconList.push(
            <div className="bug-icon-container" id={icons} onClick={(e) => setPriority(icons)} >
              <i className="bi bi-bug"></i>
            </div>
          )
        } else {
          iconList.push(
            <div className="bug-icon-container" id={icons} onClick={(e) => setPriority(icons)} >
              <i className="bi bi-bug-fill"></i>
            </div>
          )
        }
        icons+=1
      }
      return iconList
    }

    // const getTime = setTimeout(() =>{
    //     let date = new Date()
    //     let currentTime = date.toLocalString('en-US')
    //     return currentTime
    //   }, 60000)
    
    const users = Object.values(useSelector((state)=>state.users.entities))

    const submitBug = (e) => {
      const newBug = {name, details, steps, version, assignedTo, createdBy, priority}
      e.target.preventDefault()
      dispatch(makeNewBug(newBug))
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
      <div className="large-bug-card">
        <form onSubmit={(e) => submitBug(e)} id="bugform">
          <div className="large-bug-title">
            <h1>
              <label className="bug-form-label" htmlFor='name'>Name:</label>
              <input 
                  className="bug-input"
                  name="name"
                  type="text"
                  placeholder={bug.name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
              /> 
            </h1>
          </div>
          <div className="lb-col1 lb-col">
            <label className="bug-form-label">Details:</label>
            <input
              className="bug-input"
              name="details"
              type="text"
              placeholder={bug.details}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>
          <div className="lb-col2 lb-col">
            <label className="bug-form-label">Steps:</label>
            <input
              className="bug-input"
              name="steps"
              type="text"
              placeholder={bug.steps}
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
            />
          </div>
          <div className="lb-col3 lb-col">
            <label className="bug-form-label">Version:</label>
            <input
              className="bug-input"
              name="version"
              type="text"
              placeholder={bug.version}
              value={version}
              onChange={(e) => setVersion(e.target.value)}
            />
          </div>
          <div className="lb-col4 lb-col">
            <label className="bug-form-label">Priority:</label>
            <div className="bug-form-priority-container">
              {setBugIcons()}
           
              <input
                className="bug-input"
                name="priority"
                type="hidden"
                value={priority}
              />
            </div>
          </div>
          <div className="lb-col5 lb-col">
            <label className="bug-form-label">Assign To:</label>
            <select className="user-dropdown" name="assignedto" id="assignedto" form="bugform" value={assignedTo}>
              {users.map((user)=>(
                <option key={user.id} value={user.name} selected={user.name === bug.assignedTo}>{user.name}</option>
              ))}
            </select>
          </div>
          <div className="lb-col6 lb-col">
            <label className="bug-form-label">Created By:</label>
            <input
              className="bug-input"
              name="createdBy"
              type="text"
              disabled="true"
              value={createdBy}              
            />
          </div>
          <div className="lb-col7 lb-col">
             
            <iframe src="https://www.zeitverschiebung.net/clock-widget-iframe-v2?language=en&size=medium&timezone=America%2FLos_Angeles" width="100%" height="115" frameborder="0" seamless title="time"></iframe>
         
          </div>
          <button className="large-bug-submit btn lb-footer" type="submit"></button>
        </form>
          
      </div>
    )
}
