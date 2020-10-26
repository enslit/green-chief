const Coupon = require('../models/Coupon')

module.exports = {
	create(code, owner) {
		const coupon = new Coupon({ code, owner })
		return coupon.save()
	},

	countCouponOrders(orders) {
		const total = orders.length
		const ordersByStatus = {}

		for (let order of orders) {
			if ( ! ordersByStatus[order.status] ) {
				ordersByStatus[order.status] = 0
			}
			ordersByStatus[order.status]++
		}

		return {total, ordersByStatus}
	}
}