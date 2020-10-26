import {SET_COUPONS} from "../actions/couponActions"

const initialState = {
	list: []
}

const CouponReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_COUPONS:
			return {
				...state,
				list: action.coupons
			}
		default: return state
	}
}

export default CouponReducer