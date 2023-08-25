const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema(
	{
		customerEmail: String,
		customerFeedback: String,
	},
	{
		timestamps: true,
	}
);

const feedback = mongoose.model("feedback", feedbackSchema);

module.exports = { feedback };
