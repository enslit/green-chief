const SET_USERS = 'SET_USERS'
const PUT_USER = 'PUT_USER'
const UPDATE_USER = 'UPDATE_USER'
const REMOVE_USER = 'REMOVE_USER'
const SET_DETAIL_USER = 'SET_DETAIL_USER'

const initialState = {
	list: [],
	detail: null
}

const UsersReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USERS:
			return {
				...state,
				list: action.users
			}
		case PUT_USER:
			return {
				...state,
				list: [...state.list, action.user]
			}
		case UPDATE_USER:
			return {
				...state,
				list: state.list.map(u => {
					if (u.id === action.userId) {
						u = action.formData
					}
					return u
				})
			}
		case REMOVE_USER:
			return {
				...state,
				list: state.list.filter(u => u.id !== action.userId)
			}
		case SET_DETAIL_USER:
			return {
				...state,
				detail: action.userId ? state.list.find(item => item._id === action.userId) : null
			}
		default: return state
	}
}
export default UsersReducer

export const setUsersAC = users => ({type: SET_USERS, users})
export const putUserAC = user => ({type: PUT_USER, user})
export const updateUserAC = (userId, formData) => ({type: UPDATE_USER, userId, formData})
export const removeUserAC = userId => ({type: REMOVE_USER, userId})
export const setDetailUser = (userId = null) => ({type: SET_DETAIL_USER, userId})