import {SET_USER, UNSET_USER} from "../actions/authenticateActions"

const initialState = {
	token: null,
	user: null,
	isAuthenticated: false,
	isAdmin: false
}

const AuthenticateReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				token: action.payload.token,
				user: action.payload.user,
				isAuthenticated: true,
				isAdmin: action.payload.user.isAdmin
			}
		case UNSET_USER:
			return {
				...state,
				token: null,
				user: null,
				isAuthenticated: false
			}
		default: return state
	}
}

export default AuthenticateReducer