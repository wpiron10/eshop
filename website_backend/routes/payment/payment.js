const express = require("express");
const router = express.Router();
const createStripe = require("stripe");

//import du modèle

const stripe = createStripe(process.env.STRIP_SK);

const Order = require("../../models/Order");
const User = require("../../models/User");

router.post("/payment", async (req, res) => {
	try {
		console.log("entrée dans la route payment");
		// Réception du token créer via l'API Stripe depuis le Frontend
		const response = await stripe.charges.create({
			amount: req.fields.amount,
			// title: req.fields.title,
			currency: "eur",
			description: req.fields.description,
			// On envoie ici le token
			source: req.fields.token,
		});

		if (response) {
			const description = JSON.parse(req.fields.description);
			console.log(description, "description");
			const idUser = description.id_user;
			console.log(idUser, "id use");
			console.log(typeof idUser, "id use");
			const isExistingUser = await User.findOne({ id_user: idUser }); // searching if user exists in db
			console.log(isExistingUser, "isExistingUser");
			if (isExistingUser) {
				const newOrder = new Order({
					total_price: req.fields.amount / 100,
					// currency: req.fields.currency,
					id_user: isExistingUser.id_user,
					id_order: req.fields.id_order,
					date_order: String(new Date()),
					products: req.fields.description,
				});
				await newOrder.save();
				//Etape 5 Envoyer le résultat au client
				res.json(response);
			} else {
				const newOrder = new Order({
					total_price: req.fields.amount / 100,
					// currency: req.fields.currency,
					id_user: idUser,
					id_order: req.fields.id_order,
					date_order: String(new Date()),
					products: req.fields.description,
				});
				await newOrder.save();
				//Etape 5 Envoyer le résultat au client
				res.json(response);
			}
		}
	} catch (error) {
		res.status(400).json(error);
		console.log(error, "errir");
	}
});

module.exports = router;
