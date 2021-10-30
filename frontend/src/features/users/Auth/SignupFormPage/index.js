// frontend/src/components/SignupFormPage/index.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Form, Input, Card, CardFooter, CardHeader, Button, ButtonGroup } from "reactstrap";
import * as sessionActions from '../../../../store/session'

export default function SignupFormPage({ setIsFlipped, setIsLoaded, setShowModal, isFlipped }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [newUser, setNewUser] = useState({}) ;
  const handleSignupSubmit = (newUser, setNewUser) => {
    if (newUser.password === newUser.confirmPassword) {
    setNewUser(newUser.errors = []);
    return dispatch(sessionActions.signup(newUser))
      .catch(async (res) => {
        const data = await res.json();
        if (data.ok){
          setIsLoaded(true)
          setShowModal(false)
        }
        if (data && data.errors) setNewUser(newUser.errors = data.errors);
      });
  }
  return setNewUser(newUser.errors = ['Confirm Password field must be the same as the Password field']);
};
  useEffect(()=> {
      setNewUser(newUser.errors = [])
  }, [])

  if (sessionUser) return <Redirect to="/" />;

  return (
    <Card className="text-center login-form-container" body>
      <CardHeader className="signup-card-header">SIGNUP</CardHeader>
          <Form onSubmit={(newUser, setNewUser) => handleSignupSubmit(newUser, setNewUser)}>
          <ul className="error-container">
              {newUser.errors >=1 ? newUser.errors.map((error, idx) => <li key={idx}>{error}</li>):null}
          </ul>
          <div className="input-div email">
              <Input
              className="signup-email-input"
              type="text"
              placeholder='Email'
              value={newUser.email}
              onChange={(e) => setNewUser({email: e.target.value})}
              required
              />
          </div>
          <div className="input-div name">
              <Input
              type="text"
              className='signup-name-input'
              placeholder='Name'
              value={newUser.name}
              onChange={(e) => setNewUser({name: e.target.value})}
              required
              />
          </div>
          <div className="input-div password">
              <Input
              type="password"
              className="signup-password-input"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({password: e.target.value})}
              required
              />
          </div>
          <div className="input-div confirm">
              <Input
              type="password"
              className="signup-confirm-input"
              placeholder="Confirm Password"
              value={newUser.confirm}
              onChange={(e) => setNewUser({confirm: e.target.value})}
              required
              />
          </div>
          </Form>
          <CardFooter className="signup-card-footer"><ButtonGroup><Button type="submit">Submit</Button><Button className="debmo-btn">Demo</Button><Button type="button" onClick={()=>setIsFlipped(!isFlipped)}>Login</Button></ButtonGroup></CardFooter>    
      </Card>
  );
}

