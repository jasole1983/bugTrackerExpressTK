const colors = ["white", "lime", "yellow", "orange", "red"]
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
        bugIcons.push(<i className="bi bi-bug-fill" key={n*10}></i>)
    }
    return bugIcons
}

