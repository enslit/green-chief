const utils = require('../utils/utils')

module.exports = (req, res, next) => {
	if (!req.user) {
		return res.status(401).json(utils.responseCreator(0, "Нет авторизации"))
	}

	const {user} = req

	utils.user.isAdmin(user.userId)
		.then(result => {
			if (result.isAdmin) {
				next()
			} else {
				res.status(403).json(utils.responseCreator(0, "Нет доступа"))
			}
		})
}