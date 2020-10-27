const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const auth = require('./midlewares/auth.midleware')
const admin = require('./midlewares/admin.midleware')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000
const corsOptions = {
	origin: ['http://localhost:3000', 'http://green-chief.ru', 'http://80.249.148.177'],
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	credentials: true
}

app.use(cors(corsOptions))
app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/admin/', [auth, admin], require('./routes/admin.routes'))
app.use('/api/user/', [auth, admin], require('./routes/user.routes'))
app.use('/api/coupon/', auth, require('./routes/coupon.routes'))
app.use('/api/woo/', auth, require('./routes/woocommerce.routes'))

if (process.env.NODE_ENV === 'production') {
	app.use('/', express.static(path.join(__dirname, 'client', 'build')))

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

async function start() {
	try {
		await mongoose.connect(process.env.DB_HOST, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: true
		})
		app.listen(PORT, () => {
			console.log(`server has been started on port ${PORT}`)
		})
	} catch (error) {
		console.error('Server Error: ', error.message)
		process.exit(1)
	}
}

start()