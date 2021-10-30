import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../../../store/session'
import { Card, ListGroup, Input, ListGroupItem, CardHeader, CardFooter } from 'reactstrap';
import './LoginForm.css'

export default function LoginFormPage({ setIsFlipped, setIsLoaded, setShowModal, isFlipped }) {
  const dispatch = useDispatch()
  const [loginfo, setLoginfo] = useState({})
  const sessionUser = useSelector(state => state.session.user);
  const handleLoginSubmit = (loginfo, setLoginfo) => { 
    dispatch(sessionActions.login(loginfo.email, loginfo.password ))
    .catch(async (res) => {
      const data = await res.json();
        if (data && data.errors) setLoginfo(loginfo.errors = data.errors);
      });
  }
  
  const loginForm = () => {
    if (sessionUser){
      setIsLoaded(true)
      setShowModal(false)
      return <Redirect to="/" />
    } else {
      return (
    <Card className="text-center login-form-container" body id="loginFormCard">
      <CardHeader className="login-card-header">LOGIN</CardHeader>
        <form onSubmit={handleLoginSubmit}>
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
        </form>
    </Card>
  );
  }

  }  
  useEffect(()=>{
    setLoginfo(loginfo.errors = [])
  }, [])
  return loginForm()
  
}

