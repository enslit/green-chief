module.exports = {
	user: require('./user.utils'),
	coupon: require('./coupon.utils'),

	responseCreator(type = 1, message = '', data = null) {
		const types = {
			0: 'error',
			1: 'success',
			2: 'warning'
		}
		return {type: types[type], message, data}
	}
}