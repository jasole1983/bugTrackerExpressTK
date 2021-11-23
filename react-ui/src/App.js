import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { Redirect } from "react-router"
import { fetchBugs } from "./features/bugs/bugSlice";
import { fetchUsers } from "./features/users/userSlice"
import * as sessionActions from "./store/session";
import NavBar from "./features/NavBar/NavBar";
import BugPage from "./features/bugs/bugPage"
import BugForm from "./features/bugs/BugForm/BugForm"
import ProtectedRoute from "./features/users/Auth/ProtectedRoute";
import DashBoard from "./features/DashBoard/DashBoard"
import LoginPage from "./features/users/Auth/LoginPage/LoginPage";
import Home from "./features/Home/Home";
import BugView from "./features/bugs/BugView/BugView";

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state=>state.session.user)
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
    dispatch(fetchUsers())
    dispatch(fetchBugs())
    
  }, [dispatch]);

  return isLoaded && (
    <>
      <NavBar currentUser={currentUser} setIsLoaded={setIsLoaded}/>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login">
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
