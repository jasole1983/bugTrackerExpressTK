const colors = ["white", "green", "yellow", "orange", "red"]
const levels = ["", "LOW", "MED", "HIGH", "CRIT"]

export default function getPriorities(priority){
    const color = colors[priority]
    const level = levels[priority]
    const result = {color, level}
    return result
}

