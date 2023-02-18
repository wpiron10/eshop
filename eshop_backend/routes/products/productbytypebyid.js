const express = require("express");
const router = express.Router();

//import du modèle User
const Product = require("../../models/Product");

router.get("/products/:type/:id", async (req, res) => {
	console.log("route /products type by ID");
	try {
		const params_type = req.params.type;
		const params_id = req.params.id;
		const mproductsbytypeandID = await Product.find({
			type: params_type,
			_id_product: params_id,
		});

		res.status(200).json(mproductsbytypeandID);
	} catch (error) {
		res.status(400).json(error);
	}
});

module.exports = router;
