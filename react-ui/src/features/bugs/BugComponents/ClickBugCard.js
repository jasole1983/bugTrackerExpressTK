import React, { useContext } from 'react'
import BugCard from '../BugCard/BugCard'
import { BugContext } from '../../../BugContext'



export default function ClickBugCard({ bugg, setShowModal }) {
    // eslint-disable-next-line no-unused-vars
    const [ bug, setBug ] = useContext(BugContext)
    const setContext = (b) => {
        setBug({...b})
        setShowModal(true)
    }

    return (
        <button className="bug-card-btn" onClick={() => setContext(bugg)}>
            <BugCard bug={bugg} />
        </button>
    )
}
