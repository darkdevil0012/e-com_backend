const { Product } = require("../models/product");
const express = require("express");
const protect = require("../middlewares/auth");
const router = express.Router();

router.post("/add", protect, async function (req, res) {
	const productName = req.body.productName;
	const color = req.body.color;
	const price = req.body.price;
	const description = req.body.description;
	const image = req.body.image;

	const productData = {
		productName,
		color,
		price,
		description,
		image,
	};
	const savedProduct = new Product(productData);
	const savedpro = await savedProduct.save();
	// console.log(savedpro);

	res
		.status(200)
		.send({ message: "Product Added Successfully", product: savedpro });
});

router.get("/Allproducts", async function (req, res) {
	const allProducts = await Product.find();

	// console.log(allProducts);

	res.status(200).send({ product: allProducts });
});

router.get("/:id", async function (req, res) {
	const productId = req.params.id;
	const product = await Product.findOne({ _id: productId });

	res.status(200).send({ message: "Product Found", product: product });
});

router.get("/delete/:id", async function (req, res) {
	const productId = req.params.id;
	const product = await Product.deleteOne({ _id: productId });

	res.status(200).send({ message: "Product Deleted" });
});

router.put("/edit/:id", async function (req, res) {
	const productId = req.params.id;
	const product = await Product.findOne({ _id: productId });

	if (product) {
		product.productName = req.body.productName;
		product.color = req.body.color;
		product.price = req.body.price;
		product.description = req.body.description;
		product.image = req.body.image;

		const savedpro = await product.save();

		res.send({ message: "Product Updated Successfully", savedpro });
	} else {
		res.send({ message: "Product Not Found" });
	}
});

module.exports = router;
