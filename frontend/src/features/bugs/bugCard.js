import React from 'react'
import { useSelector } from 'react-redux'
import './bugs.css'
import getPriorities from './priorityController'

export default function BugCard({ bug, setShowModal, setModalBug }) {

    const {color, level} = getPriorities(bug.priority)
    const bugCardText = {
        color
    }
    const clicked = () => {
        setShowModal(true)
        setModalBug(bug)
    }
    const priorityLevel = () => {
        const bugIcons = []
        for (let i = 0; i < bug.priority; i++){
            bugIcons.push(<i className="bi bi-bug-fill"></i>)
        }
        return bugIcons
    }
    const users = Object.values(useSelector((state)=>state.users.entities))
    const user = users[bug.assignedTo - 1].name

    return (
        <div className="bug-card" onClick={() => clicked()}>
            <div className="bug-card-text card-title" style={bugCardText}>{bug.name}</div>
            <div className="bug-card-text card-priority-lvl" style={bugCardText}>{level}</div>
            <div className="bug-card-text card-priority" style={bugCardText}>{priorityLevel()}</div>
            <div className="bug-card-text card-assignedto" style={bugCardText}>{user}</div>
        </div>
    )
}
