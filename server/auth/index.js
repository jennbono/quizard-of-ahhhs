const express = require('express')
const router = express.Router()
const User = require('../db/models/user')
const passport = require('../passport')

router.get('/google', passport.authenticate('google', { scope: ['profile'] }))
router.get(
	'/google/callback',
	passport.authenticate('google', {
		successRedirect: '/',
		failureRedirect: '/login'
	})
)

// this route is just used to get the user basic info
router.get('/user', (req, res, next) => {
	if (req.user) {
		return res.json({ user: req.user })
	} else {
		return res.json({ user: null })
	}
})

router.post(
	'/login',
	function (req, res, next) {
		next()
	},
	passport.authenticate('local'),
	(req, res) => {
		const user = JSON.parse(JSON.stringify(req.user)) // hack
		const cleanUser = Object.assign({}, user)
		if (cleanUser.local) {
			delete cleanUser.local.password
		}
		res.json({ user: cleanUser })
	}
)

router.post('/saveGoogleUser', (req, res) => {
	const { googleId, firstName, lastName, email, token } = req.body;
	// ADD VALIDATION
	User.findOne({ 'google.googleId': googleId }, (err, userMatch) => {
		if (userMatch) {
			return res.json({
				error: `Sorry, already a user with the googleId: ${googleId}`
			})
		}
		const newUser = new User({
			'google.googleId': googleId,
			firstName: firstName,
			lastName: lastName,
			email: email,
			token: token
		})
		newUser.save((err, savedUser) => {
			if (err) return res.json(err)
			return res.json(savedUser)
		})
	})
})

router.post('/logout', (req, res) => {
	if (req.user) {
		req.session.destroy()
		res.clearCookie('connect.sid') // clean up!
		return res.json({ msg: 'logging you out' })
	} else {
		return res.json({ msg: 'no user to log out!' })
	}
})

router.post('/signup', (req, res) => {
	const { username, password } = req.body
	// ADD VALIDATION
	User.findOne({ 'local.username': username }, (err, userMatch) => {
		if (userMatch) {
			return res.json({
				error: `Sorry, already a user with the username: ${username}`
			})
		}
		const newUser = new User({
			'local.username': username,
			'local.password': password
		})
		newUser.save((err, savedUser) => {
			if (err) return res.json(err)
			return res.json(savedUser)
		})
	})
})
//get all data from leaderboard, sort by highscore and return the top 10
// router.get('/leaderboard', (req, res) => {
// 	var q = User.find({}).sort({ highscore: -1 }).limit(4);
// 	q.execFind(function(err, data) {
// 		res.json(data);
// 	})
// })

router.get('/leaderboard', (req, res) => {
	User.find({}).sort({ highscore: -1 }).limit(10).exec(function (err, data) {
		res.json(data);
	})
})


//find by the username and update to the current score, then if the current score is higher 
//than the high score, update the high score
router.put('/endGame/:username/:score', (req, res) => {
	User.update({
		"local.username": req.params.username
	},
		{
			$set: {
				"currentScore": req.params.score
			}

		})
		.then(() => {
			User.findOne({ "local.username": req.params.username }

			).then(user => {
				if (user.currentScore > user.highscore) {
					User.findOneAndUpdate({ "local.username": req.params.username }, { $set: { "highscore": req.params.score } }, function (err, updated) {
						if (err) {
							console.log(err);
						}
						if (updated) {
							console.log("updated");
						}
					})
				}
			})
		})
})


module.exports = router