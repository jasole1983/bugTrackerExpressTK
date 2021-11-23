import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signup } from "../../userSlice";
import './SignupFormPage.css'

export default function SignupFormPage({ setIsFlipped, setIsLoaded, setShowModal, isFlipped }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState([]);
  const name = useInputForm('')
  const email = useInputForm('')
  const password = useInputForm('')
  const confirmed = useInputForm('')
  const handleSignupSubmit = (e) => {
    e.preventDefault()
    if (password.value === confirmed.value) {
    setErrors([]);
    return dispatch(signup({
      name: name.value, email: email.value, password: password.value, admin: false,
    }))
      .catch(async (res) => {
        const data = await res.json();
        if (data.ok){
          setShowModal(false)
        }
        if (data && data.errors) setErrors(data.errors);
      });
  } else {
    return setErrors(['Confirm Password field must be the same as the Password field']);

  }
};
  if (sessionUser) return <Redirect to="/home" />;

  return (
    <div className="login-form-container" id="submitFormCard">
      <h1 className="signup card-header">SIGNUP</h1>
      <ul className="signup card-error-container">
          {errors >=1 ? errors.map((error, idx) => <li key={idx}>{error}</li>):null}
      </ul>
      <form onSubmit={handleSignupSubmit}> 
          <div className="card-input email">
              <input
              className="signup-input"
              type="text"
              placeholder='Email'
              {...email}
              required
              />
          </div>
          <div className="card-input name">
              <input
              type="text"
              className='signup-input'
              placeholder='Name'
              {...name}
              required
              />
          </div>
          <div className="card-input password">
              <input
              type="password"
              className="signup-input"
              placeholder="Password"
              {...password}
              required
              />
          </div>
          <div className="card-input confirm">
              <input
              type="password"
              className="signup-input"
              placeholder="Confirm Password"
              {...confirmed}
              required
              />
          </div>
          <div className="signup-card-footer">
            <button className="submit-card-btn submit card-btn" type="submit">SUBMIT</button>
            
            <button className="signup-card-btn-flip card-btn"type="button" onClick={()=>setIsFlipped(!isFlipped)}>LOGIN</button>
          </div>    
        </form>
      </div>
  );
}

const useInputForm = initialValue => {
  const [ value, setValue ] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value, 
    onChange: handleChange
  }
}