const express = require("express");
const router = express.Router();

const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const User = require("../../models/User");

// login to user account
router.post("/login", async (req, res) => {
	console.log("route : /login"); // import of User

	try {
		const { email, password } = req.fields;
		const getMyUser = await User.findOne({ email: email });

		if (getMyUser) {
			const salt = getMyUser.salt;
			const hashCheck = SHA256(password + salt).toString(encBase64);
			if (getMyUser.hash === hashCheck) {
				console.log("heyyy =>", getMyUser);
				console.log(getMyUser);
				res.status(200).json(getMyUser);
			}
			if (getMyUser.hash !== hashCheck) {
				res.status(409).json({ message: "Mauvais email ou mot de passe" });
			}
		} else {
			res.status(403).json({ message: "Aucun compte trouvé avec cet email" });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});
module.exports = router;
