import React, { createContext, useState } from 'react'

const BugContext = createContext([{}, () => {}])

const BugProvider = (props) => {
    const [ bug, setBug ] = useState({})
    const mgnBug = [bug, setBug]
    return (
        <BugContext.Provider value={mgnBug}>
            {props.children}
        </BugContext.Provider>
    )
}

export { BugContext, BugProvider }