import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
// import * as sessionActions from "./store/session";
import NavBar from "./components/NavBar/NavBarTop";
import BugPage from "./features/bugs/bugPage"
import { fetchBugs } from "./features/bugs/bugSlice";
import { fetchUsers } from "./features/users/userSlice"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    // dispatch(sessionActions.restoreUser())
    // .then(() => 
    setIsLoaded(true)
    // );
    dispatch(fetchBugs())
    dispatch(fetchUsers())
  }, [dispatch]);

  return isLoaded && (
    <>
      <NavBar />
      <Switch>
        <Route path="/dashboard">
        </Route>
        <Route path="/viewbugs">
          <BugPage />
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
      
    </>
  );
}

export default App;
