import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import NavBar from "./features/NavBar/NavBar";
import BugPage from "./features/bugs/bugPage"
import { fetchBugs } from "./features/bugs/bugSlice";
import { fetchUsers } from "./features/users/userSlice"
import BugForm from "./features/bugs/BugForm/BugForm"
import BlockedRoute from "./features/users/Auth/BlockedRoute";
import { useSelector } from "react-redux";
import DashBoard from "./features/DashBoard/DashBoard"
import LoginPage from "./features/users/Auth/LoginPage/LoginPage";
import Home from "./features/Home/Home";
import BugView from "./features/bugs/BugView/BugView";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const currentUser = useSelector(state=>state.session.currentuser)
  const refreshState = () => {
    dispatch(fetchUsers())
    dispatch(fetchBugs())
  }
  

  console.log({isLoaded})
  useEffect(() => {
    sessionActions.restoreUser()
    setIsLoaded(true)
    refreshState()
  }, []);

  return isLoaded && (
    <>
      
      <NavBar currentUser={currentUser} setIsLoaded={setIsLoaded}/>
      <Switch>
        <Route exact path="/">
          <LoginPage currentUser={currentUser}/>
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/dashboard">
          <DashBoard />
        </Route>
        <Route exact path="/viewbugs">
          <BugPage />
        </Route>
        <Route exact path="/createbug/:bId">
          <BugForm />
        </Route>
        <Route exact path="/viewbug/:bugId">
          <BugView />
        </Route>
        <BlockedRoute path='/'/>
      </Switch>
      
    </>
  );
}

export default App;
