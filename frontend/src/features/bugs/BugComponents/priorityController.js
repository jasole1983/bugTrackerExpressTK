const colors = ["white", "green", "yellow", "orange", "red"]
const levels = ["", "LOW", "MED", "HIGH", "CRIT"]

export function getPriorities(priority){
    const color = colors[priority]
    const level = levels[priority]
    const result = {color, level}
    return result
}

export function priorityLevel(priority){
    const bugIcons = []
    for (let n = 0; n < priority; n++){
        bugIcons.push(<i className="bi bi-bug-fill"></i>)
    }
    return bugIcons
}

