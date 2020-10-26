const {Router} = require('express')
const utils = require('../utils/utils')
const router = Router()
const WooCommerceAPI = require('woocommerce-api')

const WooCommerce = new WooCommerceAPI({
	url: process.env.WOO_URL,
	consumerKey: process.env.WOO_KEY,
	consumerSecret: process.env.WOO_SECRET,
	wpAPI: true,
	version: process.env.WOO_VERSION
});

const WooCommerce_green = new WooCommerceAPI({
	url: process.env.WOO_URL,
	consumerKey: process.env.WOO_KEY,
	consumerSecret: process.env.WOO_SECRET,
	wpAPI: true,
	version: process.env.WOO_GREEN_CHIEF_ENDPOINT_VERSION
});

router.post('/orders', (req, res) => {
	const queryParams = req.body
	const params = {
		page: queryParams.page || 1,
		per_page: queryParams.per_page || 10
	}

	WooCommerce.getAsync(`orders?page=${params.page}&per_page=${params.per_page}`)
		.then(result => {
			const orders = JSON.parse(result.toJSON().body)
			res.send(orders)
		})
})

router.post('/coupons', (req, res) => {
	const queryParams = req.body
	const params = {
		page: queryParams.page || 1,
		per_page: queryParams.per_page || 100
	}

	WooCommerce.getAsync(`coupons?page=${params.page}&per_page=${params.per_page}`)
		.then(result => {
			const coupons = JSON.parse(result.toJSON().body)
			res.send(coupons)
		})
})

router.get('/coupon-orders/:code', async (req, res) => {
	const code = decodeURI(req.params.code)

	if (!code) {
		res.status(400).json(utils.responseCreator(0, 'Не указан код купона'))
	}

	WooCommerce_green.getAsync(`coupon-orders/${encodeURI(code)}`)
		.then(result => {
			console.log('response')
			const orders = JSON.parse(result.toJSON().body)
			const countOrders = utils.coupon.countCouponOrders(orders)

			res.json(utils.responseCreator('1', 'Список заказов с купоном ' + code, {orders, countOrders}))
		})
		.catch(error => {
			console.error(error.message)
			res.status(500).json(utils.responseCreator(0, 'Ошибка запроса на ИМ'))
		})
})

module.exports = router