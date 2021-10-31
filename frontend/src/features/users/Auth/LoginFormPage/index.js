import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import * as sessionActions from '../../../../store/session'
import { Card, ListGroup, Input, ListGroupItem, CardHeader, CardFooter, Form } from 'reactstrap';
import './LoginForm.css'

export default function LoginFormPage({ setIsFlipped, isFlipped }) {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.session.user)
  const [loginfo, setLoginfo] = useState({})
  const handleLoginSubmit = async (e) => { 
    e.target.preventDefault()
    console.log("before dispatch")
    const res = await dispatch(sessionActions.login(loginfo.email, loginfo.password ))
    const data = await res.json();
    if (data.user){
      return <Redirect to='/' />;
    } else {
      loginfo.errors = data.errors
    }
  }
  useEffect(()=>{
    setLoginfo(loginfo.errors = [])
  }, [])

  if (currentUser) {
    return <Redirect to='/' />;
  }

  return (
    <Card className="text-center login-form-container" body id="loginFormCard">
      <CardHeader className="login-card-header">LOGIN</CardHeader>
        <Form onSubmit={handleLoginSubmit}>
            <ListGroup className="login-card-error-container">    
              {loginfo.errors >= 1? loginfo.errors.map((error, idx) => <ListGroupItem key={idx}>{error}</ListGroupItem>):null}
            </ListGroup>
            <div className="login-card-input-cred">            
                <Input 
                className="login-input"
                type="text"
                name="email"
                placeholder="Email"
                value={loginfo.email}
                onChange={(e) => setLoginfo({email: e.target.value})}
                required
                />
            </div>
            <div className="login-card-input-pw">
                <Input 
                className="login-input"
                name="password"
                type="password"
                placeholder="Password"
                value={loginfo.password}
                onChange={(e) => setLoginfo({password: e.target.value})}
                required
                />
            </div>
        <CardFooter className="login-card-footer">
          <button type="submit" className="submit-card-btn">Submit</button>
          <button type="button" className="login-card-btn-flip" onClick={()=>setIsFlipped(!isFlipped)}>Signup</button ></CardFooter>

        </Form>
    </Card>

 
  
  )
}

