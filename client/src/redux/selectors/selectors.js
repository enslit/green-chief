// App
export const getLoading = state => state.app.isFetching

// Order
export const ordersSelector = state => state.order
export const countOrdersSelector = state => state.order.count
export const countOrdersByStatusSelector = state => state.order.ordersByStatus

// User
export const getUsersSelector = state => state.users.list

// Coupon
export const couponListSelector = state => state.coupon.list