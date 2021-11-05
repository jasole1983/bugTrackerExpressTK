// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Input, Card, CardFooter, CardHeader, ListGroup, ListGroupItem } from "reactstrap";
import * as sessionActions from '../../../../store/session'
import './SignupFormPage.css'

export default function SignupFormPage({ setIsFlipped, setIsLoaded, setShowModal, isFlipped }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState('') ;
  const [email, setEmail] = useState('') ;
  const [password, setPassword] = useState('') ;
  const [confirmed, setConfirmed] = useState('') ;
  const handleSignupSubmit = (e) => {
    e.preventDefault()
    if (password === confirmed) {
    setErrors([]);
    return dispatch(sessionActions.signup({
      name, email, password, admin: false,
    }))
      .catch(async (res) => {
        const data = await res.json();
        if (data.ok){
          setIsLoaded(true)
          setShowModal(false)
        }
        if (data && data.errors) setErrors(data.errors);
      });
  } else {
    return setErrors(['Confirm Password field must be the same as the Password field']);

  }
};
  if (sessionUser) return <Redirect to="/" />;

  return (
    <Card className="text-center login-form-container" body>
      <CardHeader className="text-center signup-card-header">SIGNUP</CardHeader>
        <ListGroup className="error-container">
            {errors >=1 ? errors.map((error, idx) => <ListGroupItem key={idx}>{error}</ListGroupItem>):null}
        </ListGroup>
        <form onSubmit={handleSignupSubmit}>
        <div className="signup-input-divs-container">  
          <div className="input-div email">
              <Input
              className="signup-input"
              type="text"
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              />
          </div>
          <div className="input-div name">
              <Input
              type="text"
              className='signup-input'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              />
          </div>
          <div className="input-div password">
              <Input
              type="password"
              className="signup-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              />
          </div>
          <div className="input-div confirm">
              <Input
              type="password"
              className="signup-input"
              placeholder="Confirm Password"
              value={confirmed}
              onChange={(e) => setConfirmed(e.target.value)}
              required
              />
          </div>
          <CardFooter className="signup-card-footer">
            <button className="submit-card-btn" type="submit">Submit</button>
            
            <button className="signup-btn-flip"type="button" onClick={()=>setIsFlipped(!isFlipped)}>Login</button></CardFooter> 
          </div>   
          </form>
      </Card>
  );
}

