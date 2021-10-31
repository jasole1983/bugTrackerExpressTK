import React, { useState } from 'react'
import './BugRadio.css'
import { getPriorities } from './priorityController'
export default function BugRadio({ index, setPriority, priority }) {
    const [checked, setChecked] = useState(false)
    const {color, level} = getPriorities(index)
    const emptyBug = <i className="bi bi-bug" ></i>
    const fullBug = <i className="bi bi-bug-fill" ></i>
    const handleChange = (e) => {
        setPriority(e.target.value)
        (priority===index)? setChecked(true): setChecked(false)
    }
    return (
        <div className="bug-radio-btn" style={{color}}>
            <div className="bug-radio-btn-header tooltip"><span className="tooltiptext">{level}</span></div>
            <label for={level} className="bug-icon-label">
                <input 
                className="bug-icon-btn" 
                type="radio" 
                value={index} 
                id={level} 
                name="priority"
                checked={checked}
                onChange={(e) => handleChange(e)}
                >
                {checked? fullBug:emptyBug}
                </input>
            </label>            
        </div>
    )
}
    
    
    
    