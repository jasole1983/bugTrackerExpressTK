const colors = ["white", "green", "yellow", "orange", "red"]
const levels = ["", "Low", "Medium", "High", "Critical"]

export default function getPriorities(priority){
    const color = colors[priority]
    const level = levels[priority]
    const result = {color, level}
    return result
}

export const getIcons = (idx, func) => {
    const {color, level} = getPriorities(idx)
    const arrZero = (
      <>
        <button className="bug-icon-btn" id={1} style={{color}} onClick={(e) => func(e.target.id)} >
              <i className="bi bi-bug"></i>
        </button>
        <button className="bug-icon-btn" id={2} style={{color}} onClick={(e) => func(e.target.id)} >
              <i className="bi bi-bug"></i>
        </button>
        <button className="bug-icon-btn" id={3} style={{color}} onClick={(e) => func(e.target.id)} >
              <i className="bi bi-bug"></i>
        </button>
        <button className="bug-icon-btn" id={4} style={{color}} onClick={(e) => func(e.target.id)} >
              <i className="bi bi-bug"></i>
        </button>
      </>

    )
    const arrOne = (
      <>
        <button className="bug-icon-btn" id={1} style={{color}} onClick={(e) => func(e.target.id)} >
              <i className="bi bi-bug-fill"></i>
        </button>
        <button className="bug-icon-btn" id={2} style={{color}} onClick={(e) => func(e.target.id)} >
              <i className="bi bi-bug"></i>
        </button>
        <button className="bug-icon-btn" id={3} style={{color}} onClick={(e) => func(e.target.id)} >
              <i className="bi bi-bug"></i>
        </button>
        <button className="bug-icon-btn" id={4} style={{color}} onClick={(e) => func(e.target.id)} >
              <i className="bi bi-bug"></i>
        </button>
      </>

    )
    const arrTwo = (
      <>
        <button className="bug-icon-btn" id={1} style={{color}} onClick={(e) => func(e.target.id)} >
              <i className="bi bi-bug-fill"></i>
        </button>
        <button className="bug-icon-btn" id={2} style={{color}} onClick={(e) => func(e.target.id)} >
              <i className="bi bi-bug-fill"></i>
        </button>
        <button className="bug-icon-btn" id={3} style={{color}} onClick={(e) => func(e.target.id)} >
              <i className="bi bi-bug"></i>
        </button>
        <button className="bug-icon-btn" id={4} style={{color}} onClick={(e) => func(e.target.id)} >
              <i className="bi bi-bug"></i>
        </button>
      </>

    )
    const arrThree = (
      <>
        <button className="bug-icon-btn" id={1} style={{color}} onClick={(e) => func(e.target.id)} >
              <i className="bi bi-bug-fill"></i>
        </button>
        <button className="bug-icon-btn" id={2} style={{color}} onClick={(e) => func(e.target.id)} >
              <i className="bi bi-bug-fill"></i>
        </button>
        <button className="bug-icon-btn" id={3} style={{color}} onClick={(e) => func(e.target.id)} >
              <i className="bi bi-bug-fill"></i>
        </button>
        <button className="bug-icon-btn" id={4} style={{color}} onClick={(e) => func(e.target.id)} >
              <i className="bi bi-bug"></i>
        </button>
      </>

    )
    const arrFour = (
      <>
        <button className="bug-icon-btn" id={1} style={{color}} onClick={(e) => func(e.target.id)} >
              <i className="bi bi-bug-fill"></i>
        </button>
        <button className="bug-icon-btn" id={2} style={{color}} onClick={(e) => func(e.target.id)} >
              <i className="bi bi-bug-fill"></i>
        </button>
        <button className="bug-icon-btn" id={3} style={{color}} onClick={(e) => func(e.target.id)} >
              <i className="bi bi-bug-fill"></i>
        </button>
        <button className="bug-icon-btn" id={4} style={{color}} onClick={(e) => func(e.target.id)} >
              <i className="bi bi-bug-fill"></i>
        </button>
      </>

    )
    const iconList = [arrZero, arrOne, arrTwo, arrThree, arrFour];
    const icons = iconList[idx];
    return icons
}