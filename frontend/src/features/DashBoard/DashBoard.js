import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './DashBoard.css'
import BugCard from '../bugs/BugCard/BugCard'

export default function DashBoard() {
  const [ list, setList ] = useState('')
  const currentUser = useSelector(state=>state.session.user)
  const allBugs = Object.values(useSelector((state) => state.bugs.entities))
  const bugs = allBugs.filter((bug)=>bug.assignedTo === currentUser.id)
  const low = () => bugs.filter((bug)=>bug.priority === 1)
  const med = () => bugs.filter((bug)=>bug.priority === 2)
  const high = () => bugs.filter((bug)=>bug.priority === 3)
  const crit = () => bugs.filter((bug)=>bug.priority === 4)
  const handleClick = (event) => {
    setList(event.target.id)
  }
   
  return (
    <div className="page-container dashboard">
      <h1 className="page-header dashboard">{currentUser.name}'s Dashboard</h1>
      <div className="dashboard-card-container">
        <div className="bug-card dashboard-bc db-bc1" id='low' onClick={(e)=>handleClick(e)}>
          <h1 className="db-bug-card-title db-bc1">LOW PRIORITY</h1>
          <div className="db-bug-card-icon-container bug-icons db-bc1">
            <i className="bi bi-bug-fill"></i>
          </div>
          <p className="db-bug-card-body db-bc1">
            COUNT: {low().length}
          </p>
        </div>
        
        <div className="bug-card dashboard-bc db-bc2" id='med' onClick={(e)=>handleClick(e)}>
          <h1 className="db-bug-card-title db-bc2">MED PRIORITY</h1>
          <div className="db-bug-card-icon-container bug-icons db-bc2">
            <i className="bi bi-bug-fill"></i>
            <i className="bi bi-bug-fill"></i>
          </div>
          <p className="db-bug-card-body db-bc2">
          COUNT: {med().length}
            </p>
        </div>
        
        <div className="bug-card dashboard-bc db-bc3" id='high' onClick={(e)=>handleClick(e)}>
          <h1 className="db-bug-card-title db-bc3">HIGH PRIORITY</h1>
          <div className="db-bug-card-icon-container bug-icons db-bc3">
            <i className="bi bi-bug-fill"></i>
            <i className="bi bi-bug-fill"></i>
            <i className="bi bi-bug-fill"></i>
          </div>
          <p className="db-bug-card-body db-bc3">
          COUNT: {high().length}
          </p>
        </div>
       
        <div className="bug-card dashboard-bc db-bc4" id='crit' onClick={(e)=>handleClick(e)}>
          <h1 className="db-bug-card-title db-bc4">CRIT PRIORITY</h1>
          <div className="db-bug-card-icon-container bug-icons db-bc4">
            <i className="bi bi-bug-fill"></i>
            <i className="bi bi-bug-fill"></i>
            <i className="bi bi-bug-fill"></i>
            <i className="bi bi-bug-fill"></i>
          </div>
          <p className="db-bug-card-body db-bc4">
          COUNT: {crit().length}
          </p>
        </div>

      </div>
      <div className="dashboard-bc-bottom-container">
        {(list === 'low') && low().map((bug) => <BugCard bug={bug}  key={bug.id}/>)}
        {(list === 'med') && med().map((bug) => <BugCard bug={bug}  key={bug.id}/>)}
        {(list === 'high') && high().map((bug) => <BugCard bug={bug}  key={bug.id}/>)}
        {(list === 'crit') && crit().map((bug) => <BugCard bug={bug}  key={bug.id}/>)}
      </div>
    </div>
  )
}
