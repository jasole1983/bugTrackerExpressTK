import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../../../store/session'
import './LoginForm.css'

export default function LoginFormPage({ setIsFlipped, isFlipped }) {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.session.user)
  const [ errors, setErrors ] = useState([])
  const [ credential, setCredential ] = useState('');
  const [ password, setPassword ] = useState('');

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
    }}     

  if (currentUser) return (
    <Redirect to='/home' />
  )
  

  return (
    <div className="login-form-container" id="loginFormCard">
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
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          autoComplete="new-username"
          />
        </div>
        <div className="login card-input pw">
          <input 
          className="login-input"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
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
