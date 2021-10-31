import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Card, CardHeader } from 'reactstrap'
import { getPriorities, priorityLevel } from '../BugComponents/priorityController'
import './BugView.css'

export default function BugView() {
  const bugs = Object.values(useSelector(state=>state.bugs.entities))
  const users = Object.values(useSelector(state=>state.users.entities))
  const { bugId } = useParams()
  const bug = bugs[bugId-1]
  const assignedTo = users[bug.assignedTo-1]
  const createdBy = users[bug.createdBy-1]
  const {color, level} = getPriorities(bug.priority)
  const bugIcons = priorityLevel(bug.priority)
  
  return (
    <div className="page-container lg-bug">
      <div className="lg-bug-card">
        <div className="lg-bug-card-header">
          <div className="lg-bug-card-hdr-btns">
            <button className="lg-bug-card-hdr-edit bug-view-btn">EDIT</button>
            <button className="lg-bug-card-hdr-del bug-view-btn">DELETE</button>
          </div>
          <h1 className="lg-bug-card-header-title" style={{color}}>
            {bug.name}
          </h1>
          <button className="lg-bug-card-hdr-close bug-view-btn">X</button>
        </div>
        <div className="lg-bug-card-container">
          <div className="lg-bug-card-long-div bc1">
            <p className="bc1-text">{bug.details}</p>
          </div>
          <div className="lg-bug-card-long-div bc2">
            <p className="bc2-text">{bug.steps}</p>
          </div>
          <div className="lg-bug-card-image">
            feature coming soon
          </div>
          <div className="lg-bug-card-short-div bc4" style={{color}}>
            <h5 className="bc5-text">{level}</h5>
            {bugIcons}
          </div>
          <div className="lg-bug-card-short-div bc5">
            <p className="bc4-text">{bug.version}</p>
          </div>
          <div className="lg-bug-card-short-div bc6">

          </div>
          <div className="lg-bug-card-bottom">
            <p className="bc3-text">{assignedTo.name}</p>
          </div>
          <div className="lg-bug-card-bottom">
            <p className="bc3-text">{createdBy.name}</p>
          </div>
        </div>
      </div>
      
    </div>
  )
}
