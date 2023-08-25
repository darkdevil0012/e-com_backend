const { Order } = require("../models/order");
const express = require("express");
const router = express.Router();

router.post("/add", async function (req, res) {
	const email = req.body.email;
	const address = req.body.address;
	const phoneNumber = req.body.phoneNumber;
	const name = req.body.name;
	const products = req.body.products;

	const OrderData = {
		email,
		address,
		phoneNumber,
		name,
		products,
	};

	console.log(OrderData);

	const savedOrder = new Order(OrderData);
	const saved = await savedOrder.save();
	console.log(saved);

	res.status(200).send({ message: "Order Placed Sucessfully" });
});

router.get("/allorders", async function (req, res) {
	const allOrders = await Order.find();

	res.status(200).send({ orders: allOrders });
});

module.exports = router;
