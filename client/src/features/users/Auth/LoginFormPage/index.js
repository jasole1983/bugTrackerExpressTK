import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../../../store/session'
import { Card, ListGroup, Input, ListGroupItem, CardHeader, CardFooter } from 'reactstrap';
import './LoginForm.css'

export default function LoginFormPage({ setIsFlipped, isFlipped }) {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.session.user)
  const [ email, setEmail ] = useState('')
  const [ errors, setErrors ] = useState([])
  const [ password, setPassword ] = useState('')

  const handleLoginSubmit = (e) => { 
    console.log("before dispatch")
    e.preventDefault();
    setErrors([])
    return dispatch(sessionActions.login({email, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      })
    }     

  if (currentUser) {
    return <Redirect to='/' />;
  }

  return (
    <Card className="text-center login-form-container" body id="loginFormCard">
      <CardHeader className="login-card-header">LOGIN</CardHeader>
        <ListGroup className="login-card-error-container">    
          {errors >= 1? errors.map((error, idx) => <ListGroupItem key={idx}>{error}</ListGroupItem>):null}
        </ListGroup>
        <form onSubmit={handleLoginSubmit} method={'POST'}>
          <div className="login-card-input-cred">            
            <Input 
            className="login-input"
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
          </div>
          <div className="login-card-input-pw">
            <Input 
            className="login-input"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
          </div>
        <CardFooter className="login-card-footer">
          <input type="submit" className="submit-card-btn login-card-btn" value="SUBMIT"/>
          <button type="button" className="login-card-btn-flip login-card-btn" onClick={()=>setIsFlipped(!isFlipped)}>SIGNUP</button>
        </CardFooter>

      </form>
    </Card>

 
  
  )
}

