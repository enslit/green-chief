import * as axios from 'axios'

const instance = axios.create({
	baseURL: "http://localhost:5000/api/",
	withCredentials: true,
	headers: {
		Accept: 'application/json',
		"Content-Type": "Application/json",
	},
})

const checkToken = () => {
	const token = localStorage.getItem('green-bloggers-token')
	if (token) {
		const t = JSON.parse(token)
		instance.defaults.headers.Authorization = `Bearer ${t}`
	}
}

export const authenticationApi = {
	login(email, password) {
		return instance
			.post('/auth/login', { email, password })
			.then(response => response.data)
	},
}

export const woocommerceApi = {
	allOrders(params) {
		checkToken()
		return instance
			.post('/woo/orders', params)
			.then(response => response.data)
	},
	allCoupons(params) {
		checkToken()
		return instance
			.post('/woo/coupons', params)
			.then(response => response.data)
	},
	getCouponOrders(code) {
		checkToken()
		return instance
			.get('/woo/coupon-orders/' + code)
			.then(response => response.data)
	}
}

export const usersApi = {
	register(formData) {
		checkToken()
		return instance
			.post('/user/register', formData)
			.then(response => response.data)
	},
	getAll() {
		checkToken()
		return instance
			.get('/user')
			.then(response => response.data)
	},
	delete(userId) {
		checkToken()
		return instance
			.delete('/user/' + userId)
			.then(response => response.data)
	},
	update(formData) {
		checkToken()
		return instance
			.put('/user', formData)
			.then(response => response.data)
	}
}

export const couponsApi = {
	all() {
		checkToken()
		return instance
			.get('/coupon/')
			.then(resp => resp.data)
	}
}