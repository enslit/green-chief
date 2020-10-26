import {SET_ORDERS} from "../actions/orderActions"

const initialState = {
	list: [],
	count: 0,
	ordersByStatus: {}
}

const OrderReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ORDERS:
			return {
				...state,
				list: action.data.orders,
				count: action.data.countOrders.total,
				ordersByStatus: action.data.countOrders.ordersByStatus
			}
		default: return state
	}
}

export default OrderReducer