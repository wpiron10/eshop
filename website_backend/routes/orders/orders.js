const express = require("express");
const router = express.Router();

//import du modèle User

const Order = require("../../models/Order");

router.get("/orders/:idUser", async (req, res) => {
	try {
		console.log("route /orders/:idUser");

		const idUser = req.params.idUser;
		const ordersbyUser = await Order.find({ id_user: idUser });
		console.log(ordersbyUser, "orders by user");
		console.log(ordersbyUser.length, "orders by user");
		if (ordersbyUser.length > 0) {
			res.status(200).json(ordersbyUser);
		} else {
			res.status(401).json({ message: "Aucune commande enregistrée." });
		}
	} catch (error) {
		res.status(400).json(error);
	}
});

module.exports = router;
