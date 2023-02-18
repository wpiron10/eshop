const mongoose = require("mongoose");

// création du modele de Side (références)

const Product = mongoose.model("Product", {
	_id_product: Number,
	title: String,
	type: String,
	content: String,
	Ingredients: Array,
	price: Number,
	quantity: Number,
	Allergenes: Array,
	Nutri_score: String,
	image_url: String,
	size: Array,
	sizes: Array,
	drink: Array,
	drinks: Array,
	side: Array,
	sides: Array,
});

module.exports = Product;
