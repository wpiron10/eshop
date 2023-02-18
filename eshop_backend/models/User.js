const mongoose = require("mongoose");

const User = mongoose.model("User", {
	username: {
		type: String,
		default: "",
	},
	email: {
		type: String,
	},
	id_user: {
		type: Number,
	},
	token: String,
	hash: String,
	salt: String,
});

module.exports = User;
