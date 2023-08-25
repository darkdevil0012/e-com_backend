const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
	{
		email: String,
		address: String,
		phoneNumber: Number,
		name: String,
		products: [String],
	},
	{
		timestamps: true,
	}
);

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order };
