const express = require("express");
const router = express.Router();

//import du modèle User

const Product = require("../../models/Product");

router.get("/products", async (req, res) => {
	try {
		let search = "";
		// if (req.query.search) {
		// 	console.log(req.query, "query");
		// 	search = search + `?search=${req.query.search}`;
		// }
		// for (const [key, value] of Object.entries(req.query)) {
		// 	if (key && value) {
		// 		findParameters[key] = value;
		// 	}
		// }

		console.log("route /products");
		let mproducts = await Product.find();
		if (!mproducts) {
			mproducts = await Product.find();
		}
		res.status(200).json(mproducts);
	} catch (error) {
		res.status(400).json(error);
	}
});

module.exports = router;
