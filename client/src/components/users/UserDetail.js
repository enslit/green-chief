import React, {useEffect} from 'react';
import {useDispatch} from "react-redux"
import UserForm from "./UserForm"
import {setAppTitle} from "../../redux/actions/appActions"
import {Redirect} from "react-router-dom"
import {setDetailUser} from "../../redux/reducers/users-reducer"
import {updateUser} from "../../redux/thunks/usersThunks"

function UserDetail(props) {
	const dispatch = useDispatch()
	const userId = props.match.params.userId

	useEffect(() => {
		if (userId) {
			dispatch(setAppTitle('Редактирование профиля'))
			dispatch(setDetailUser(userId))
		}
		return () => {
			dispatch(setDetailUser(null))
		}
	}, [dispatch, userId])

	const registerHandler = values => {
		dispatch(updateUser(values))
	}

	return userId ? <UserForm onSubmit={registerHandler} /> : <Redirect to={"/users/"} />
}

export default UserDetail