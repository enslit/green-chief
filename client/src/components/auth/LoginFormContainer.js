import React  from "react"
import LoginForm from "./LoginForm"
import {login} from "../../redux/thunks/authenticateThunks"
import {connect} from "react-redux"
import {getLoading} from "../../redux/selectors/selectors"

const LoginFormContainer = ({login, loading}) => {

  const loginHandler = values => {
    login(values)
  }

  return <LoginForm
    onSubmit={loginHandler}
    loading={loading}
  />
}

const mapStateToProps = state => ({
  loading: getLoading(state)
})

export default connect(mapStateToProps, {login})(LoginFormContainer)