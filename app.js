var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')

const PORT = process.env.PORT || 3000
const app = express()
mongoose.connect('mongodb://fayis:123fayis@ds117681.mlab.com:17681/fitintime')
let Schema = mongoose.Schema
app.use(bodyParser.json())

let userSchema = Schema({
	username: { type: String, unique: true },
	password: String
})

let User = mongoose.model('users', userSchema)

app.post('/login', (req, res) => {
	const { username, password } = req.body
	User.findOne({ username, password })
		.then(data => {
			if (!data) {
				res.json({
					type: 'err'
				})
			}
			res.json({
				type: 'success',
				id: data._id
			})
		})
		.catch(err => {
			res.json({
				type: 'err'
			})
		})
})

app.post('/register', (req, res) => {
	const {
		username,
		password
	} = req.body
	const newUser = new User({
		username,
		password
	})
	newUser.save()
		.then(r => {
			console.log(r)
			res.json({
				type: 'success',
				id: r._id
			})
		})
		.catch(() => {
			res.json({
				type: 'err'
			})
		})
})
app.listen(PORT, () => {
	console.log(PORT)
})