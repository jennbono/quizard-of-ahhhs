const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
mongoose.promise = Promise

// Define userSchema
const userSchema = new Schema({
	firstName: { type: String, unique: false },
	lastName: { type: String, unique: false },
	local: {
		username: { type: String, unique: false, required: false },
		password: { type: String, unique: false, required: false }
	},
	google: {
		googleId: { type: String, required: false }
	},
	highscore: { type: Number, default: 0 },
	currentScore: Number,
	email: { type: String, unique: false, required: false },
	token: { type: String, unique: false, required: false }

}, { timestamps: true }
)

// Define schema methods
userSchema.methods = {
	checkPassword: function (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.local.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
userSchema.pre('save', function (next) {
	if (!this.local.password) {
		next()
	} else {
		this.local.password = this.hashPassword(this.local.password)
		next()
	}

})

// Create reference to User & export
const User = mongoose.model('User', userSchema)
module.exports = User
