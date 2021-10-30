import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../../../store/session'
import { Card, ListGroup, Input, ListGroupItem, Form, CardHeader, CardFooter, ButtonGroup, Button } from 'reactstrap';
import './LoginForm.module.css'

export default function LoginFormPage({ setIsFlipped, setIsLoaded, setShowModal, isFlipped }) {
  const dispatch = useDispatch()
  const [loginfo, setLoginfo] = useState({})
  const sessionUser = useSelector(state => state.session.user);
  const handleLoginSubmit = (loginfo, setLoginfo) => { 
    setLoginfo(loginfo.errors = []);
    return dispatch(sessionActions.login(loginfo.email, loginfo.password ))
    .catch(async (res) => {
      const data = await res.json();
      if (data.ok){
        setIsLoaded(true)
        setShowModal(false)
      }
        if (data && data.errors) setLoginfo(loginfo.errors = data.errors);
      });
  }

  useEffect(()=>{
    setLoginfo(loginfo.errors = [])
  }, [])
  if (sessionUser)return <Redirect to="/" />

  return (
    <Card className="text-center login-form-container" body>
      <CardHeader className="login-card-header">LOGIN</CardHeader>
        <Form onSubmit={() => handleLoginSubmit(loginfo, setLoginfo)}>
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
        </Form>
        <CardFooter className="login-card-footer"><ButtonGroup><Button type="submit">Submit</Button><Button type="button" onClick={()=>setIsFlipped(!isFlipped)}>Signup</Button ></ButtonGroup></CardFooter>
    </Card>
  );
}

