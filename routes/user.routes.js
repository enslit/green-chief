const {Router} = require('express')
const bcrypt = require('bcrypt')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const Coupon = require('../models/Coupon')
const utils = require('../utils/utils')
const router = Router()
require('dotenv')


router.get('/', async (req, res) => {
	try {
		User.find({})
			.then(response => {
				res.json(utils.responseCreator(1, '', response))
			})
	} catch (err) {

	}
})


router.get('/:userId', async (req, res) => {
	const userId = req.params.userId
	if (!userId) {
		return res.status(400).json(utils.responseCreator(0, 'Не указан ID пользователя'))
	}

	const user = await User.findById(userId).exec()
	if (!user) {
		return res.status(404).json(utils.responseCreator(2, 'Пользователь не найден'))
	}

	res.json(utils.responseCreator(1, '', user))
})


router.put('/', async (req, res) => {
	try {
		const form = req.body

		// let coupon = await Coupon.findOne({code: form.coupon})
		//
		// if (!coupon && form.coupon) {
		// 	coupon = await utils.coupon.create(form.coupon, form._id)
		// }
		//
		// form.coupon = coupon

		User.findByIdAndUpdate(form._id, form)
			.then(response => {
				res.json(utils.responseCreator(1, 'Данные пользователя обновлены', response))
			})
			.catch(error => {
				res.status(400).json(utils.responseCreator(0, `Ошибка обновления пользователя: ${error.message}`))
			})
	} catch (e) {
		res.status(500).json(utils.responseCreator(0, 'Что-то пошло не так. Попробуйте снова'))
	}
})


router.delete('/:userId', async (req, res) => {
	const userId = req.params.userId
	if (!userId) {
		return res.status(400).json(utils.responseCreator(0, 'Не указан ID пользователя'))
	}

	await User.findOneAndDelete({_id: userId})

	return res.json(utils.responseCreator(1, 'Пользователь удален'))
})

// TODO - add block user route
// TODO - add admin role route



router.post(
	'/register',
	[
		check('email', 'Некорректный email').isEmail(),
		check('name', 'Не указано имя').exists(),
		check('password', 'Минимальная длинна пароля 8 символов').isLength({min: 8})
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Некорректные данные',
					data: {request: req.body}
				})
			}

			const {email, name, password, coupon} = req.body

			const candidate = await User.findOne({email})

			if (candidate) {
				return res.status(400).json({message: 'Пользователь с таким email уже зарегистрирован'})
			}

			const hashedPass = await bcrypt.hash(password, 12)
			const user = new User({email, name, password: hashedPass, coupon})

			// if (coupon) {
			// 	const c = await Coupon.findOne({code: coupon})
			//
			// 	if (c) {
			// 		user.coupon = c
			// 	} else {
			// 		user.coupon = await utils.coupon.create(coupon, user._id)
			// 	}
			// }

			// Coupon
			// const coupons = []
			// if (Array.isArray(couponCodes) && couponCodes.length > 0) {
			// 	for (code of couponCodes) {
			// 		const coupon = await userUtils.findCoupon(code)
			// 		if (coupon) {
			// 			coupons.push(coupon)
			// 		} else {
			// 			const newCoupon = await userUtils.createCoupon(code, user._id)
			// 			if (newCoupon) {
			// 				coupons.push(newCoupon)
			// 			} else {
			// 				console.error('Ошибка создания купона')
			// 				res.status(400).json({message: 'Ошибка создания купона'})
			// 			}
			// 		}
			// 	}
			// }
			//
			// if (coupons.length > 0) {
			// 	user.coupons = coupons
			// }

			user.save()
				.then(response => {
					res.status(201).json(utils.responseCreator(1, 'Пользователь создан', response))
				})
				.catch(error => {
					res.status(400).json(utils.responseCreator(0, 'Ошибка создания пользователя', error))
				})

		} catch (e) {
			res.status(500).json(utils.responseCreator(0, 'Что-то пошло не так. Попробуйте снова'))
		}
	}
)

module.exports = router