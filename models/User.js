const {Schema, model, Types} = require('mongoose')
const Coupon = require('./Coupon')

const schema = new Schema({
	email: {type: String, required: true, unique: true},
	name: {type: String, required: true},
	password: {type: String, required: true, select: false},
	isAdmin: {type: Boolean, default: false},
	isBlocked: {type: Boolean, default: false},
	// coupon: {type: Types.ObjectId, ref: 'Coupon', default: null}
	coupon: {type: String, default: null}
})

// TODO add cascade delete all coupons this user
schema.pre('findOneAndDelete', async next => {
	await Coupon.remove({owner: this._id}).exec()
	next()
})

module.exports = model('User', schema)