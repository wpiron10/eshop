const mongoose = require("mongoose");

// création du modele de Order (références)

const Order = mongoose.model("Order", {
	id_order: Number,
	id_user: Number,
	total_price: Number,
	currency: String,
	date_order: String,
	products: String,
});

module.exports = Order;
