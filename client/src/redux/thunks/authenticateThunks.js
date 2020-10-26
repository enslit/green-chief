import {authenticationApi} from "../../api/request"
import {setFetching, setMessage} from "../actions/appActions"
import {setUser} from "../actions/authenticateActions"

export const login = ({email, password}) => dispatch => {
	dispatch(setFetching(true))
	authenticationApi
		.login(email, password)
		.then(({type, message, data}) => {
			if (type === 'success') {
				dispatch(setUser(data))
			} else {
				dispatch(setMessage(type, message))
			}
		})
		.catch((error) => {
			console.error(error)
			dispatch(setMessage('error', error.message))
		})
		.finally(() => {
			dispatch(setFetching(false))
		})
}

