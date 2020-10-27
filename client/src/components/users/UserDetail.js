import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux"
import UserForm from "./UserForm"
import {setAppTitle} from "../../redux/actions/appActions"
import {Redirect} from "react-router-dom"
import {setDetailUser} from "../../redux/reducers/users-reducer"
import {updateUser} from "../../redux/thunks/usersThunks"
import {couponListSelector} from "../../redux/selectors/selectors"
import {fetchCoupons} from "../../redux/thunks/coupon.thunk"

function UserDetail(props) {
	const dispatch = useDispatch()
	const userId = props.match.params.userId
	const coupons = useSelector(state => couponListSelector(state))

	useEffect(() => {
		if (userId) {
			dispatch(setAppTitle('Редактирование профиля'))
			dispatch(setDetailUser(userId))
			dispatch(fetchCoupons())
		}
		return () => {
			dispatch(setDetailUser(null))
		}
	}, [dispatch, userId])

	const registerHandler = values => {
		dispatch(updateUser(values))
	}

	return userId ? <UserForm onSubmit={registerHandler} coupons={coupons} /> : <Redirect to={"/users/"} />
}

export default UserDetail