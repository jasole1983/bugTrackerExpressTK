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
  const customStyle = {}

  console.log({isLoaded})
  useEffect(() => {
    dispatch(sessionActions.restoreUser())
    .then(() => setIsLoaded(true)
    ).then(() => refreshState());
  }, [dispatch]);

  isLoaded? (customStyle["zIndex"] = -100):(customStyle["zIndex"] = 100)

  return isLoaded && (
    <>
      
      <NavBar setIsLoaded={setIsLoaded}/>
      <Switch>
        <Route exact path="/login">
          <LoginPage style={customStyle} setIsLoaded={setIsLoaded}/>
        </Route>
        <ProtectedRoute exact path="/">
          <Home />
        </ProtectedRoute>
        <ProtectedRoute path="/dashboard">
          <DashBoard />
        </ProtectedRoute>
        <ProtectedRoute path="/viewbugs">
          <BugPage />
        </ProtectedRoute>
        <ProtectedRoute path="/createbug">
          <BugForm blankbug={new BlankBug(currentUser || 5)}/>
        </ProtectedRoute>
        <ProtectedRoute path="/dashboard">
          <UserHistory />
        </ProtectedRoute>
      </Switch>
      
    </>
  );
}

export default App;
