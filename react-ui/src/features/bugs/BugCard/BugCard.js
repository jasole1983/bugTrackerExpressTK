import React from 'react'
import './BugCard.css'
import { getPriorities, priorityLevel } from '../BugComponents/priorityController'
import useGetUser from '../../users/useGetUser'

export default function BugCard({bug}) {
    const {color, level} = getPriorities(bug.priority)
    const bugList = priorityLevel(bug.priority)
    const bugCardText = { color }
    const assignedTo = useGetUser(bug.assignedTo)

    return (
        <div className="bug-card">
            <div className="bug-card-div card-title" style={bugCardText}>
                <p className="bug-card-text card-title-text">{bug.name}</p>
            </div>
            <div className="bug-card-div card-priority-lvl" style={bugCardText}>
                <p className="bug-card-text card-priority-lvl-text">{level}</p>
            </div>
            <div className="bug-card-div card-priority" style={bugCardText}>
                <p className="bug-card-text card-priority-text">{bugList}</p>
            </div>
            <div className="bug-card-div card-assignedto" style={bugCardText}>
                <p className="bug-card-text card-assignedto-text">{assignedTo.name}</p>
            </div>
        </div>
    )
}
