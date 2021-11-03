import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import NavBar from "./features/NavBar/NavBar";
import BugPage from "./features/bugs/bugPage"
import { fetchBugs } from "./features/bugs/bugSlice";
import { fetchUsers } from "./features/users/userSlice"
import BugForm from "./features/bugs/BugForm/BugForm"
import ProtectedRoute from "./features/users/Auth/ProtectedRoute";
import { useSelector } from "react-redux";
import DashBoard from "./features/DashBoard/DashBoard"
import LoginPage from "./features/users/Auth/LoginPage/LoginPage";
import Home from "./features/Home/Home";
import BugView from "./features/bugs/BugView/BugView";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const currentUser = useSelector(state=>state.session.user)
  const refreshState = () => {
    dispatch(fetchUsers())
    dispatch(fetchBugs())
  }
  useEffect(() => {
    dispatch(sessionActions.restoreUser())
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
        <ProtectedRoute exact path="/home">
          <Home />
        </ProtectedRoute>
        <ProtectedRoute exact path="/dashboard">
          <DashBoard />
        </ProtectedRoute>
        <ProtectedRoute exact path="/viewbugs">
          <BugPage />
        </ProtectedRoute>
        <ProtectedRoute path="/createbug">
          <BugForm currentUser={currentUser} />
        </ProtectedRoute>
        <ProtectedRoute path="/editbug/:bugId">
          {/* <BugEdit currentUser={currentUser} /> */}
        </ProtectedRoute>
        <ProtectedRoute exact path="/viewbug/:bugId">
          <BugView />
        </ProtectedRoute>
      </Switch>
      
    </>
  );
}

export default App;
