const utils = require('../utils/utils')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
	if (req.method === 'OPTIONS') {
		return next()
	}

	try {

		const token = req.headers.authorization.split(' ')[1] // Bearer TOKEN

		if (!token) {
			return res.status(401).json(utils.responseCreator(0, 'Нет авторизации'))
		}

		req.user = jwt.verify(token, process.env.JWT_SECRET)
		next()

	} catch (e) {
		return res.status(401).json(utils.responseCreator(0, 'Нет авторизации'))
	}
}