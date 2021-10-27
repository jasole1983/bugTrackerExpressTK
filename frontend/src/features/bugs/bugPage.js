import React from 'react'
import { useSelector } from 'react-redux'
// import { bugSelectors } from './bugSlice'
import BugCard from './bugCard'
// import { bugs } from '../../store'
import './bugs.css'

export default function BugPage() {
    // const dispatch = useDispatch()
    // useEffect(() =>{
    //     dispatch(fetchBugs())
    // }, [dispatch])
    
    const bugs = Object.values(useSelector(state => state.bugs.entities))
    
    return (
        <div className="page-container">
            <div className="page-header">
                <p className="page-header-text">LIVE BUGS</p>
            </div>
            <div className="bug-card-container">
                {bugs.map((bug) => (
                    <BugCard bug={bug} key={bug.id}/>
                ))}

            </div>
        </div>
    )
}
