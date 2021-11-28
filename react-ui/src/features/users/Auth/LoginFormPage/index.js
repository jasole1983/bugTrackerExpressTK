import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../../../store/session'
import './LoginForm.css'

export default function LoginFormPage({ setIsFlipped, isFlipped }) {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.session.user)
  const [ errors, setErrors ] = useState([])
  const credential = useInputForm('');
  const password = useInputForm('');

  const handleLoginSubmit = (e) => { 
    console.log("before dispatch")
    e.preventDefault();
    setErrors([])
    if (credential && password) {
      const user = { credential, password }
      return dispatch(sessionActions.login(user))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      })
    } else {
      return (
        <Redirect to='/noauth' />
      )
    }
    }     

  if (currentUser) return (
    <Redirect to='/home' />
  )
  

  return (
    <div className="login-form-container" body id="loginFormCard">
      <h1 className="login card-header">LOGIN</h1>
      <ul className="login card-error-container">    
        {errors >= 1? errors.map((error, idx) => <li key={idx}>{error}</li>):null}
      </ul>
      <form onSubmit={handleLoginSubmit}>
        <div className="login card-input cred">            
          <input 
          className="login-input"
          type="text"
          placeholder="Email or Username"
          name="credential"
          {...credential}
          autoComplete="new-username"
          required
          />
        </div>
        <div className="login card-input pw">
          <input 
          className="login-input"
          type="password"
          placeholder="Password"
          name="password"
          {...password}
          autoComplete="new-password"
          required
          />
        </div>
        <div className="login card-footer" id="login-card-footer">
          <button type="submit" className="submit-card-btn login card-btn">LOGIN</button>
          <button type="button" className="login-card-btn-flip login card-btn" onClick={()=>setIsFlipped(!isFlipped)}>SIGNUP</button>
        </div>
      </form>
    </div>
  )
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