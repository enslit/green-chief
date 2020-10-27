const {Router} = require('express')
const bcrypt = require('bcrypt')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const utils = require('../utils/utils')
const router = Router()
require('dotenv')

router.post(
	'/login',
	[
		check('email', 'Некорректный email').normalizeEmail().isEmail(),
		check('password', 'Введите пароль').exists()
	],
	async (request, response) => {
		try {
			const errors = validationResult(request)
			if (!errors.isEmpty()) {
				return response.status(400).json({
					errors: errors.array(),
					message: 'Некорректные данные'
				})
			}

			const {email, password} = request.body

			const user = await User
													.findOne({email})
													.select('name password isAdmin isBlocked coupon')

			if (!user) {
				return response.status(400).json({message: 'Пользователь не найден'})
			}

			const isMatch = await bcrypt.compare(password, user.password)
			if (!isMatch) {
				return response.status(400).json({message: 'Неверный пароль'})
			}

			const token = jwt.sign(
				{ userId: user.id },
				process.env.JWT_SECRET,
				{ expiresIn: '365 days' }
			)

			const responseData = {
				token,
				user: {
					id: user.id,
					name: user.name,
					isAdmin: user.isAdmin,
					coupon: user.coupon,
				}
			}

			response.json(utils.responseCreator(1, 'Авторизация прошла успешно', responseData))

		} catch (e) {
			response.status(500).json({message: 'Что-то пошло не так. Попробуйте снова. ' + e.message})
		}
	}
)

module.exports = router