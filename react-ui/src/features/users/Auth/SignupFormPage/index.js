import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signup } from "../../userSlice";
import './SignupFormPage.css'

export default function SignupFormPage({ setIsFlipped, isFlipped }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [ errors, setErrors ] = useState([]);
  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ confirmed, setConfirmed ] = useState('')
  const handleSignupSubmit = (e) => {
    e.preventDefault()
    if (password === confirmed) {
    setErrors([]);
    return dispatch(signup({
      name, email, password
    }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors)
        };
      });
  } else {
    return setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };
  if (sessionUser) return (
    <Redirect to="/home" />
    )

  return (
    <div className="login-form-container" id="submitFormCard">
      <h1 className="signup card-header">SIGNUP</h1>
      <ul className="signup card-error-container">
          {errors.length >=1 ? errors.map((error, idx) => <li key={idx}>{error}</li>):null}
      </ul>
      <form onSubmit={handleSignupSubmit}> 
          <div className="card-input email">
              <input
              className="signup-input"
              type="text"
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
          </div>
          <div className="card-input name">
              <input
              type="text"
              className='signup-input'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              />
          </div>
          <div className="card-input password">
              <input
              type="password"
              className="signup-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
          </div>
          <div className="card-input confirm">
              <input
              type="password"
              className="signup-input"
              placeholder="Confirm Password"
              value={confirmed}
              onChange={(e) => setConfirmed(e.target.value)}
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
