const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const productRouter = require("./routes/products");
const orderRouter = require("./routes/order");
const feedbackRouter = require("./routes/feedbacks");
const cors = require("cors");
const uploadRouter = require("./routes/upload");

const app = express();

app.use(cors(cors());

require("dotenv").config();

app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose.connect(process.env.mongiURI).then(() => console.log("Connected!"));

app.use(express.json());

app.get("/first-api", (req, res) => {
	const fullName = "Bano Qabil";
	res.status(201).send("First Api is running " + fullName);
});

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/upload", uploadRouter);
app.use("/orders", orderRouter);
app.use("/feedback", feedbackRouter);

app.listen(8000, () => console.log("Server is Running"));
