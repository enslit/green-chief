import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {setAppTitle} from "../../redux/actions/appActions"
import {getWoocommerceOrders} from "../../redux/thunks/woocommerceThunks"
import {Grid, Typography} from "@material-ui/core"
import OrdersTable from "./OrdersTable"
import Preloader from "../Preloader"
import {getLoading, ordersSelector} from "../../redux/selectors/selectors"

const Orders = () => {
	const loading = useSelector(state => getLoading(state))
	const orders = useSelector(state => ordersSelector(state))
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setAppTitle('Заказы'))
		dispatch(getWoocommerceOrders({ per_page: 10 }))
	}, [dispatch])

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Typography component={'h1'} variant={'h4'}>Список заказов</Typography>
			</Grid>
			{
				loading
				? <Preloader />
				: <OrdersTable rows={orders}/>
			}
		</Grid>
	)
}

export default Orders