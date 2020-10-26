const {Router} = require('express')
const router = Router()
const userUtils = require('../utils/utils')
const WooCommerceAPI = require('woocommerce-api')

const WooCommerce = new WooCommerceAPI({
	url: process.env.WOO_URL,
	consumerKey: process.env.WOO_KEY,
	consumerSecret: process.env.WOO_SECRET,
	wpAPI: true,
	version: process.env.WOO_VERSION
});

router.get('/convert', async (req, res) => {

	const coupons = []
	const PER_PAGE = 100

	const convert = page => {
		console.group('Request page: ', page)
		WooCommerce.getAsync(`orders?page=${page}&per_page=${PER_PAGE}`)
			.then(async result => {
				const resultJson = JSON.parse(result.toJSON().body)

				if (Array.isArray(resultJson)) {
					console.log('Длинна массива: ', resultJson.length)
					if (resultJson.length > 0) {
						for (let order of resultJson) {
							if (order.coupon_lines.length > 0) {
								for (let coupon of order.coupon_lines) {
									if (coupon.code.substr(0, 8) === 'rp_wcdpd') continue
									const reCoupon = coupons.find(item => item.code === coupon.code)
									if (reCoupon) {
										reCoupon.orders.push(order.id)
									} else {
										coupons.push({
											code: coupon.code,
											orders: [order.id]
										})
									}
								}
							}
						}
						console.log('Купонов в массиве: ', coupons.length)
						console.groupEnd()
						if (resultJson.length === PER_PAGE) {
							page++
							convert(page)

						} else {
							let findCoupons = 0,
									createdCoupons = 0

							for (let {code, orders} of coupons) {
								console.group('Обработка купона ', code)
								console.log('Заказов: ', orders.length)

								let coupon = await userUtils.findCoupon(code)

								if (!coupon) {
									console.log('Купон не найден в базе')
									coupon = await userUtils.createCoupon(code, null)
									createdCoupons++
								} else {
									console.log('Купон был найден в базе')
									findCoupons++
								}

								coupon.orders = coupon.orders.concat(orders)
								await coupon.save()

								console.groupEnd()
							}

							return res.json({ message: "Обработка закончена", result: {find: findCoupons, new: createdCoupons, coupons}} )
						}
					} else {
						return res.json({ message: "Получена нулевая длинна массива"} )
					}
				} else {
					res.sendStatus(400).json(resultJson)
				}
			})
			.catch(error => {
				console.error('Error: ', error.message)
			})
	}

	convert(1)

})

module.exports = router