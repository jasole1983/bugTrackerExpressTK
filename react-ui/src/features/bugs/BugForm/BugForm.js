import React, { useState, useEffect, useCallback, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DragAndDropComp from '../../DragAndDrop/DragAndDrop'
import BugRadio from '../BugComponents/BugRadio'
import { updateBug } from '../bugSlice'
import useFormInput from '../../../store/hooks/FormInput'
import './BugForm.css'
import { BugContext } from '../../../BugContext'

export default function BugForm({setShowModal, isFlipped, setIsFlipped}) {
  // eslint-disable-next-line no-unused-vars
  const currentUser = useSelector(state=>state.session.user)
  // eslint-disable-next-line no-unused-vars
  const [bug, setBug] = useContext(BugContext)
  const stpz = bug.steps.split('>')
  // eslint-disable-next-line
  const stepObj = {
    one: useFormInput(stpz[0] || ''), 
    two: useFormInput(stpz[1] || ''), 
    thr: useFormInput(stpz[2] || ''), 
    for: useFormInput(stpz[3] || ''), 
    fiv: useFormInput(stpz[4] || ''), 
    six: useFormInput(stpz[5] || '')
  }

  const [ isLoaded, setIsLoaded ] = useState(false)
  const [ name, setName ] = useState(bug.name)
  const [ details, setDetails ] = useState(bug.details)
  const [ steps, setSteps ] = useState(bug.steps)
  const [ priority, setPriority ] = useState(bug.priority)
  const [ assignedTo, setAssignedTo ] = useState(bug.assignedTo)
  const [ version, setVersion ] = useState(bug.version)
  const stepsList = Object.entries(stepObj)
  const joinSteps = (sObj) => {
    return Object.entries(sObj).map(step => step.value).join(' > ')
  }
  // eslint-disable-next-line no-unused-vars
  const [ createdBy, setCreatedBy ] = useState(bug.createdBy)
  const users = Object.values(useSelector(state=>state.users.entities))
  const dispatch = useDispatch()
  const getSteps = useCallback(
    () => {
    setSteps(joinSteps(stepObj))
  }, [stepObj])
  const submitNewBug = async (e) => {
    e.preventDefault()
    await getSteps()
    console.log({ steps })
    const res = await dispatch(updateBug({
                          id: bug.id,
                          name,
                          details,
                          steps,
                          priority,
                          assignedTo,
                          version,
                          createdBy
                        }))
    console.log({res})
    setIsFlipped(!isFlipped)
  }
  useEffect(()=>{
    setIsLoaded(true)
    getSteps()
  }, [getSteps, stepObj])

  return isLoaded && (
    
    <div className="bug-form">
      <button className="bfc-flip-btn" onClick={() => setIsFlipped(!isFlipped)}><i className="bi bi-arrow-left-square-fill"></i></button>
      <button className="bfc-close-btn" onClick={() => setShowModal(false)}><i className="bi bi-x-lg"></i></button>
      <div className="bug-form-card">
        <form onSubmit={submitNewBug}>
          <div className="bfc-sec one name long">
            <label className="bfc-lbl one name" htmlFor="name">
              Name:
            </label>
            <input
              className="bfc-inp one name long"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Brief description of problem"
              name="name"
              id="name"
              />
          </div>
          <div className="bfc-sec two details long">
            <label className="bfc-lbl two details" htmlFor="details">
              Details:
            </label>
            <textarea
              className="bfc-inp two details long"
              type="textarea"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="A detailed description of the issue"
              name="details"
              id="details"
              />
          </div>
          <div className="bfc-sec-vert-cont">
            <div className="bfc-sec-vert three steps vert">
              <label className="bfc-lbl three steps" htmlFor="steps">
                Steps:
              </label>
              <div className="bfc-inp-vert-cont" id="steps">
                
                {stepsList.map((stp) => {
                  const k = stp[0]
                  const v = stp[1]
                  return (
                    <input
                    className={`sub-step ss-${k}`}
                    id={`sub-step-${k}`}
                    type="text"
                    key={`${k}`}
                    name={`${k}`}
                    {...v}
                    />
                  )
                })}
              </div>
            </div>
            <div className="bfc-sec-col-two cont vert">
              <div className="bfc-sec-assigned four">
                <label className="bfc-lbl four assign" htmlFor="assigned">
                  Assigned To:
                </label>
                <select className="bfc-sel four assign" id="assigned" onChange={(e) => setAssignedTo(e.target.value)}>
                  {users.map(user=>(<option key={user.id.toString()} value={user.id}>{user.name}</option>))}
                </select>
              </div>
              <div className="bfc-sec-created five">
                <label className="bfc-lbl five created" htmlFor="created">
                  Version:
                </label>
                <input 
                className="bfc-inp version"
                type="text"
                placeholder="Version used"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                name="version"
                id="version"
                />
              </div>
              <div className="bfc-sec-priority">
                <label className="bfc-lbl six priority" htmlFor="priority">
                  Priority:
                </label>
                <div className="bug-icon-card-cont">
                  <BugRadio index={1}priority={priority}setPriority={setPriority}/>
                  <BugRadio index={2}priority={priority}setPriority={setPriority}/>
                  <BugRadio index={3}priority={priority}setPriority={setPriority}/>
                  <BugRadio index={4}priority={priority}setPriority={setPriority}/>
                </div>
              <button className="bfc-btn-sbt" type="submit">
                COMMIT BUG
              </button>
              </div>
            </div>
            <div className="bfc-img-cont">
              <DragAndDropComp />
            </div>
          </div>
        </form>
      </div>
    </div>         
  )
}



export function useCombineSteps(stepsObject){
  const stepz = Object.values(stepsObject)
  const mapped = stepz.map(step => step.value)
  const stepsStr = mapped.join(' > ')
  return stepsStr
}