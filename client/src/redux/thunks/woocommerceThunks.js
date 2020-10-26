import {setFetching, setMessage} from "../actions/appActions"
import {woocommerceApi} from "../../api/request"
import {setOrders} from "../actions/orderActions"

export const getWoocommerceOrders = params => dispatch => {
	dispatch(setFetching(true))
	woocommerceApi.getOrders(params)
		.then(response => {
			dispatch(setOrders(response))
		})
		.finally(() => dispatch(setFetching(false)))
}

export const getWoocommerceCoupons = params => dispatch => {
	dispatch(setFetching(true))
	woocommerceApi.getCoupons(params)
		.then(() => {
			// dispatch(setCoupons(response))
		})
		.finally(() => dispatch(setFetching(false)))
}

export const fetchCouponOrders = code => dispatch => {
	dispatch(setFetching(true))
	woocommerceApi.getCouponOrders(code)
		.then(({type, message, data}) => {
			dispatch(setMessage(type, message))
			dispatch(setOrders(data))
		})
		.finally(() => dispatch(setFetching(false)))
}