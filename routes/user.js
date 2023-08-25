const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

router.post("/register", async function (req, res) {
	const userEmail = req.body.userEmail;
	const password = req.body.password;

	const hashedpassword = await bcrypt.hash(password, saltRounds);
	const userData = { userEmail, password: hashedpassword };
	const savedUser = new User(userData);
	const saved = await savedUser.save();
	console.log(saved);

	res
		.status(200)
		.send({ message: "User Registered Sucessfully", users: saved });
});

router.post("/login", async function (req, res) {
	const { userEmail, password } = req.body;

	try {
		const user = await User.findOne({ userEmail });

		if (user) {
			const matched = await bcrypt.compare(password, user.password);

			if (matched) {
				const token = jwt.sign({ _id: user._id }, process.env.jwt_secret, {
					expiresIn: "30d",
				});
				res.send({ message: "Login Successful", user: user, token });
			} else {
				res.send({ message: "Password Incorrect" });
			}
		} else {
			res.send({ message: "User not found" });
		}
	} catch (error) {
		res.send({ message: "An error occured" });
	}
});

module.exports = router;
