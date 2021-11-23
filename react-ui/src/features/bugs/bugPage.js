import React from 'react'
import { useSelector } from 'react-redux'
import BugCard from './BugCard/BugCard'
import './bugs.css'
import { NavLink } from 'react-router-dom'

export default function BugPage() {

    const bugs = Object.values(useSelector(state => state.bugs.entities))    
    return (
        <div className="page-container bugs">
            <div className="page-header bugs">
                <h1 className="page-header-text">LIVE BUGS</h1>
            </div>
            <div className="bug-card-container">
                {bugs.map((bug) => (
                  <NavLink to={`/viewbug/${bug.id}`} key={bug.id}className="nav-link">
                    <BugCard bug={bug} />
                  </NavLink>

                ))}
            </div>              
        </div>
    )
}
