import { useState } from "react"

const useFormInput = (initial) => {
    const [ value, setValue ] = useState(initial)
    const handleChange = (e) => setValue(e.target.value)
    return {
      value: value,
      onChange: handleChange,
    }
}


export default useFormInput
