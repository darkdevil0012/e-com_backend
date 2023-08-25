const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const protect = async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			token = req.headers.authorization.split(" ")[1];
			const decoded = jwt.verify(token, process.env.jwt_secret);
			const userId = decoded._id;
			const user = await User.findOne({ _id: userId });

			if (user) {
				next();
			} else {
				res.status(401).send({ message: "No user with this Token" });
			}
		} catch (error) {
			res.status(401).send({ message: "Token Failed" });
		}
	}

	if (!token) {
		res.status(401).send({ message: "No Token" });
	}
};

module.exports = protect;
