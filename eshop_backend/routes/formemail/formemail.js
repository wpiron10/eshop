require("dotenv").config();
const express = require("express");
const router = express.Router();

const API_KEY = process.env.API_KEY;
const DOMAIN = process.env.DOMAIN;
const mailgun = require("mailgun-js")({ apiKey: API_KEY, domain: DOMAIN });

router.post("/formemail", async (req, res) => {
	try {
		const { firstname, lastname, email, message, id_order } = req.fields;

		if (firstname && lastname && email && message && id_order) {
			console.log(email, "email");
			const data = {
				from: `William PIRON  <contact@example.com>`, // As it is a free account, we can not send to another account.

				to: "w.piron.perso@gmail.com", // Email has to be : w.piron.perso@gmail.com
				subject: `Merci ${firstname}, pour votre commande #${id_order}`,

				// text: "toto",
				html: message,
				// attachment: bill_order,
			};
			mailgun.messages().send(data, function (error, body) {
				console.log("email envoyé");
			});
			res.status(200).json({ message: "transaction validé" });
		} else {
			res.status(400).json({ error: "Missing parameters" });
		}
	} catch (error) {
		res.status(400).json(error);
	}
});

module.exports = router;
