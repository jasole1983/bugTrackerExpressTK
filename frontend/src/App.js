import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import NavBar from "./features/NavBar/NavBar";
import BugPage from "./features/bugs/bugPage"
import { fetchBugs } from "./features/bugs/bugSlice";
import { fetchUsers } from "./features/users/userSlice"
import BlankBug from "./features/bugs/BugComponents/blankBug"
import BugForm from "./features/bugs/BugForm/BugForm"
import ProtectedRoute from "./features/users/Auth/ProtectedRoute";
import BlockedRoute from "./features/users/Auth/BlockedRoute";
import { useSelector } from "react-redux";
import DashBoard from "./features/DashBoard/DashBoard"
import UserHistory from "./features/users/UserHistory/UserHistory"
import LoginPage from "./features/users/Auth/LoginPage/LoginPage";
import Home from "./features/Home/Home";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const currentUser = useSelector(state=>state.session.user)
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
        <Route path="/dashboard">
          <DashBoard />
        </Route>
        <Route path="/viewbugs">
          <BugPage />
        </Route>
        <Route path="/createbug">
          <BugForm blankbug={new BlankBug(currentUser || 5)}/>
        </Route>
        <Route path="/dashboard">
          <UserHistory />
        </Route>
        <BlockedRoute path='/'/>
      </Switch>
      
    </>
  );
}

export default App;
