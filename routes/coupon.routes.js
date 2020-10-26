const {Router} = require('express')
const Coupon = require('../models/Coupon')
const router = Router()
require('dotenv')

router.get('/', async (req, res) => {
	const coupons = await Coupon.find({}).populate('owner')

	res.json(coupons)
})

module.exports = router