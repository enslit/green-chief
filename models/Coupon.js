const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
	code: {type: String, required: true, unique: true},
	orders: [{type: Number, default: []}],
	owner: {type: Types.ObjectId, default:null, ref: 'User'}
})

module.exports = model('Coupon', schema)