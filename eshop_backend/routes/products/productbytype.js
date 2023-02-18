const express = require("express");
const router = express.Router();

//import du modèle User

const Product = require("../../models/Product");

router.get("/products/:type", async (req, res) => {
	console.log("route products by type");
	try {
		const params_type = req.params.type;

		const findParameters = {
			type: params_type,
		};

		// allows to get optionnal filters
		for (const [key, value] of Object.entries(req.query)) {
			if (key && value) {
				findParameters[key] = value;
			}
		}

		const result = await Product.find(findParameters);
		res.status(200).json(result);
	} catch (error) {
		res.status(400).json(error);
	}
});

module.exports = router;
