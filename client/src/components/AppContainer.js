import React, {useEffect} from 'react';
import {ThemeProvider} from '@material-ui/styles'
import createMuiTheme from "@material-ui/core/styles/createMuiTheme"
import App from "./App"
import CssBaseline from '@material-ui/core/CssBaseline'
import {useDispatch, useSelector} from "react-redux"
import {setReady} from "../redux/actions/appActions"
import Preloader from "./Preloader"
import {setUser, unsetUser} from "../redux/actions/authenticateActions"
import useLocalStorage from "../hooks/useLocalStorage"

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});

const AppContainer = () => {
  const dispatch = useDispatch()
  const ready = useSelector(state => state.app.ready)
  const user = useSelector(state => state.auth.user)
  const token = useSelector(state => state.auth.token)
  const [userData, setUserData] = useLocalStorage('user')
  const [userToken, setUserToken] = useLocalStorage('token')

  useEffect(() => {
    if (!userData) {
      setUserData(user)
    }
    if (!userToken) {
      setUserToken(token)
    }
    if (userData && userToken) {
      dispatch(setUser({token: userToken, user: userData}))
    }
    dispatch(setReady(true))
  }, [user, token, dispatch])

  const logout = () => {
    setUserData(null)
    setUserToken(null)
    dispatch(unsetUser())
  }

  return (
      <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          {ready
            ? <App onLogout={logout} />
            : <Preloader/>
          }
      </ThemeProvider>
  );
}

export default AppContainer;