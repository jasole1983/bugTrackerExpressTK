import React, { useState } from 'react'
import './BugRadio.css'
import { getPriorities } from './priorityController'
export default function BugRadio({ index }) {
    const [checked, setChecked] = useState(false)
    const {color, level} = getPriorities(index)
    const emptyBug = <i className="bi bi-bug" ></i>
    const fullBug = <i className="bi bi-bug-fill" ></i>
    const handleChange = (e) => {
        setChecked(e.target.checked || !checked)        
    }
    return (
        <div className="bug-radio-btn" style={{color}}>
            <div className="bug-radio-btn-header tooltip"><span className="tooltiptext"></span></div>
            <label for={level} className="bug-icon-label">
                <input 
                className="bug-icon-btn" 
                type="radio" 
                value={index} 
                id={level} 
                name="priority"
                checked={checked}
                onChange={(e) => handleChange(e)}
                />
                {fullBug}{level}
            </label>            
        </div>
    )
}
    
    
    
    