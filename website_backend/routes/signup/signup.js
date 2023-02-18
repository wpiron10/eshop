const express = require("express");
const router = express.Router();

// password encrypted
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

// Create user account
router.post("/signup", async (req, res) => {
	console.log("route : /signup");
	// import of User
	const User = require("../../models/User");
	try {
		const password = req.fields.password;
		const confirmationPassword = req.fields.confirmationPassword;
		const salt = uid2(16);
		const hash = SHA256(password + salt).toString(encBase64);
		const token = uid2(16);

		if (!req.fields.username) {
			res.status(401).json({
				error:
					"Username manquant, veuillez écrire un nom d'utilisateur pour continuer l'inscription.",
			});
		} else {
			const isUserEmailExisting = await User.findOne({
				email: req.fields.email,
			});
			if (isUserEmailExisting) {
				res.status(409).json({ error: "Email déjà utilisé" });
			} else {
				// User model
				const newUser = new User({
					username: req.fields.username,
					email: req.fields.email,
					id_user: req.fields.id_user,
					hash: hash,
					salt: salt,
					token: token,
				}); // Then we save User in DB
				await newUser.save();
				res.status(200).json(newUser);
			}
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});
module.exports = router;
