import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux"
import {setAppTitle} from "../redux/actions/appActions"
import Grid from "@material-ui/core/Grid"
import {Box, Button, Typography} from "@material-ui/core"
import {fetchCouponOrders} from "../redux/thunks/woocommerceThunks"
import OrdersTable from "./orders/OrdersTable"
import {getLoading, ordersSelector} from "../redux/selectors/selectors"
import CountByStatuses from "./orders/CountByStatuses"
import Preloader from "./Preloader"

function UserDashboard(props) {
	const dispatch = useDispatch()
	const user = useSelector(state => state.auth.user)
	const orders = useSelector(state => ordersSelector(state))
	const loading = useSelector(state => getLoading(state))

	useEffect(() => {
		dispatch(setAppTitle('Панель'))
		dispatch(fetchCouponOrders(user.coupon))
	}, [dispatch])

	if (loading) {
		return <Preloader />
	}

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<Box mt={2} mb={2}>
							<Typography variant={'h5'} component={'h3'}>
								Привет {user.name}
								<Button onClick={props.onLogout} style={{marginLeft: '25px'}} color={"secondary"}>
									Выйти
								</Button>
							</Typography>
							<Typography variant={"body1"} component={'h4'}>
								Код твоего купона&nbsp;
								<Typography variant={'subtitle1'} component={'strong'}>
									{user.coupon}
								</Typography>
							</Typography>
						</Box>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<CountByStatuses />
			</Grid>
			<Grid item xs={12}>
				<OrdersTable rows={orders.list} widthGoods={false} />
			</Grid>
		</Grid>
	);
}

export default UserDashboard;