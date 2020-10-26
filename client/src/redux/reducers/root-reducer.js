import {combineReducers} from "redux"
import AppReducer from "./app-reducer"
import AuthenticateReducer from "./auth-reducer"
import OrderReducer from "./order-reducer"
import CouponReducer from "./coupons-reducer"
import {reducer as formReducer} from 'redux-form'
import UsersReducer from "./users-reducer"

const RootReducer = combineReducers({
    app: AppReducer,
    auth: AuthenticateReducer,
    order: OrderReducer,
    coupon: CouponReducer,
    users: UsersReducer,
    form: formReducer
})

export default RootReducer