import React from 'react';
import {BrowserRouter} from "react-router-dom"
import {useSelector} from "react-redux"
import { Switch, Route, Redirect } from 'react-router-dom'
import NavBar from "./NavBar"
import Container from "@material-ui/core/Container"
import LoginFormContainer from "./auth/LoginFormContainer"
import Home from "./Home"
import {AppMessage} from "./AppMessage"
import Users from "./users/Users"
import Orders from "./orders/Orders"
import Coupons from "./coupons/Coupons"
import UserDetail from "./users/UserDetail"
import RegisterFormContainer from "./users/RegisterFormContainer"
import UserDashboard from "./UserDashboard"

const routes = (isAuthenticated, isAdmin, onLogout) => {
  if (!isAuthenticated) {
    return (
      <>
        <Route exact path='/login' component={LoginFormContainer}/>
        <Redirect from={'*'} to={'/login'} />
      </>
    )
  } else if(isAdmin) {
    return (
      <>
        <Route exact path='/' component={Home}/>
        <Route exact path='/users' component={Users}/>
        <Route exact path='/orders' component={Orders}/>
        <Route exact path='/coupons' component={Coupons}/>
        <Route exact path='/user/add' component={RegisterFormContainer}/>
        <Route exact path='/users/:userId' component={UserDetail}/>
        <Redirect from={'*'} to={'/'} />
      </>
    )
  } else {
    return (
      <>
        <Route exact path='/' render={() => <UserDashboard onLogout={onLogout} />} />
        <Redirect from={'*'} to={'/'} />
      </>
    )
  }
}

function App({ onLogout }) {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const isAdmin = useSelector(state => state.auth.isAdmin)

  return (
    <BrowserRouter>
      {(isAuthenticated && isAdmin) && <NavBar onLogout={onLogout} />}
      <Container maxWidth='xl'>
        <Switch>
          {routes(isAuthenticated, isAdmin, onLogout)}
        </Switch>
        <AppMessage />
      </Container>
    </BrowserRouter>
  );
}

export default App;
