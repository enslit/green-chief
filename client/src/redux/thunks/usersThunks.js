import {setFetching, setMessage} from "../actions/appActions"
import {usersApi} from "../../api/request"
import {putUserAC, removeUserAC, setDetailUser, setUsersAC} from "../reducers/users-reducer"

export const register = formData => dispatch => {
	dispatch(setFetching(true))
	usersApi.register(formData)
		.then(({type, message, data}) => {
			if (type === 'success') {
				dispatch(putUserAC(data))
				dispatch(setMessage('success', message))
			} else {
				dispatch(setMessage(type, message))
			}
		})
		.catch(error => {
			dispatch(setMessage('error', error.toJSON().message))
		})
		.finally(() => {
			dispatch(setFetching(false))
		})
}

export const fetchUsers = () => dispatch => {
	dispatch(setFetching(true))
	usersApi.getAll()
		.then(response => {
			if (response.type === 'success') {
				dispatch(setUsersAC(response.data))
			} else {
				dispatch(setMessage(response.type, response.message))
			}
		})
		.catch(error => {
			console.error('Ошибка получения пользователей с сервера: ', error.message)
			dispatch(setMessage('error', error.message))
		})
		.finally(() => dispatch(setFetching(false)))
}

export const updateUser = formData => dispatch => {
	dispatch(setFetching(true))
	usersApi.update(formData)
		.then(response => {
			dispatch(setMessage('success', response.message))
		})
		.catch((error) => {
			console.error('Ошибка обновления пользователя : ', error.message)
			dispatch(setMessage('error', error.message))
		})
		.finally(() => dispatch(setFetching(false)))
}

export const deleteUser = userId => dispatch => {
	dispatch(setFetching(true))
	usersApi
		.delete(userId)
		.then(response => {
			dispatch(removeUserAC(userId))
			dispatch(setDetailUser(null))
			dispatch(setMessage('success', response.message))
		})
		.catch(err => console.error('Возникла ошибка во время удаления пользователя: ', err.message))
		.finally(() => dispatch(setFetching(false)))
}

