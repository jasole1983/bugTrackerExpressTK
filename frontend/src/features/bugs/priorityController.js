const colors = ["white", "green", "yellow", "orange", "red"]
const levels = ["", "Low", "Medium", "High", "Critical"]

export default function getPriorities(priority){
    const color = colors[priority]
    const level = levels[priority]
    const result = {color, level}
    return result
}