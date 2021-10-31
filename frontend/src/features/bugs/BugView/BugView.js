import React from 'react'
import { Card, CardHeader } from 'reactstrap'
import { getPriorities, priorityLevel } from '../BugComponents/priorityController'

export default function BugView({ bug }) {
  const {color, level} = getPriorities(bug.priority)
  const bugIcons = priorityLevel(bug.priority)
  
  return (
    <div className="page-container lg-bug">
      <div className="lg-bug-card">
        <div className="lg-bug-card-header">
          <button className="lg-bug-card-hdr-edit"></button>
          <button className="lg-bug-card-hdr-del"></button>
          <h5 className="lg-bug-card-header-title">
            {bug.name}
          </h5>
          <button className="lg-bug-card-hdr-close"></button>
        </div>
        <div className="lg-bug-card-container">
          <div className="lg-bug-card-long-div bc1">
            <p className="bc1-text">{bug.details}</p>
          </div>
          <div className="lg-bug-card-long-div bc2">
            <p className="bc2-text">{bug.steps}</p>
          </div>
          <div className="lg-bug-card-image">
            
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
            <p className="bc3-text">{bug.assignedTo}</p>
          </div>
        </div>
      </div>
      
    </div>
  )
}
