import {setFetching} from "../actions/appActions"
import {woocommerceApi} from "../../api/request"
import {setCoupons} from "../actions/couponActions"

export const fetchCoupons = () => dispatch => {
	dispatch(setFetching(true))
	woocommerceApi.allCoupons()
		.then(response => {
			dispatch(setCoupons(response))
		})
		.finally(() => dispatch(setFetching(false)))
}