import React, {useEffect} from 'react'
import RegisterForm from "./RegisterForm"
import {useDispatch, useSelector} from "react-redux"
import {register} from "../../redux/thunks/usersThunks"
import {setAppTitle} from "../../redux/actions/appActions"
import {couponListSelector} from "../../redux/selectors/selectors"
import {fetchCoupons} from "../../redux/thunks/coupon.thunk"

const RegisterFormContainer = () => {
	const loading = useSelector(state => state.app.isFetching)
	const coupons = useSelector(state => couponListSelector(state))
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setAppTitle('Новый пользователь'))
		dispatch(fetchCoupons())
	}, [dispatch])

	const registerHandler = values => {
		dispatch(register(values))
	}

	return <RegisterForm onSubmit={registerHandler} loading={loading} coupons={coupons} />
}

export default RegisterFormContainer