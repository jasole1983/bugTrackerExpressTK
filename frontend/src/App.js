import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
// import * as sessionActions from "./store/session";
import NavBar from "./components/NavBar/NavBarTop";
import BugPage from "./features/bugs/bugPage"

function App() {
  // const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    // dispatch(sessionActions.restoreUser())
    // .then(() => 
    setIsLoaded(true)
    // );
  }, []);

  return isLoaded && (
    <>
      <NavBar >
        <Switch>
          <Route path="/dashboard">
            <BugPage />
          </Route>
          <Route path="/viewbugs">

          </Route>
          <Route path="/createbug">

          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      </NavBar>
    </>
  );
}

export default App;
