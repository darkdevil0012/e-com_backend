const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		userEmail: String,
		password: String,
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
