const User = require('../models/User')

module.exports = {
	isBlocked(userId) {
		return User.findById(userId, 'isBlocked').exec()
	},
	isAdmin(userId) {
		return User.findById(userId, 'isAdmin').exec()
	}
}