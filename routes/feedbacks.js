const { feedback } = require("../models/feedback");
const express = require("express");
const router = express.Router();

router.post("/contact", async function (req, res) {
	const customerEmail = req.body.customerEmail;
	const customerFeedback = req.body.customerFeedback;

	const CustomerData = { customerEmail, customerFeedback };
	const savefeedback = new feedback(CustomerData);
	const savedfeedback = await savefeedback.save();
	console.log(savedfeedback);

	res
		.status(200)
		.send({ message: "FeedBack Submited", feedback: savedfeedback });
});

router.get("/allfeedbacks", async function (req, res) {
	const allFeedback = await feedback.find();

	res.status(200).send({ feedbacks: allFeedback });
});

module.exports = router;
