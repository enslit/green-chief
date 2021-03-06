import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {fetchCoupons} from "../../redux/thunks/coupon.thunk"
import Preloader from "../Preloader"
import {Grid, Typography} from "@material-ui/core"
import CouponsTable from "./CouponsTable"
import {setAppTitle} from "../../redux/actions/appActions"
import {couponListSelector, getLoading} from "../../redux/selectors/selectors"
import {makeStyles} from "@material-ui/styles"

const useStyles = makeStyles(theme => ({
	list: {
		marginTop: theme.spacing(2)
	},
}))

const Coupons = () => {
	const dispatch = useDispatch()
	const coupons = useSelector(state => couponListSelector(state))
	const loading = useSelector(state => getLoading(state))
	const classes = useStyles()

	useEffect(() => {
		dispatch(setAppTitle('Купоны'))
		dispatch(fetchCoupons())
	}, [dispatch])

	return (
		<Grid container spacing={2} className={classes.list}>
			<Grid item xs={12}>
				{
					loading
						? <Preloader />
						: coupons
							? <CouponsTable coupons={coupons} />
							: <Typography variant={"subtitle1"} component={'h3'}>Купонов нет</Typography>
				}
			</Grid>
		</Grid>

	)
}

export default Coupons