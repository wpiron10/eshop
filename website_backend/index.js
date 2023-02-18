require("dotenv").config();
// serveur via le framework Express
const express = require("express");
const cors = require("cors");

// utilisation d'express-formidable pour nos méthodes HTTP POST
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const morgan = require("morgan");

// création du serveur
const app = express();
app.use(formidable());
app.use(cors());

app.use(morgan("dev"));

// affichage des logs transitant dans le serveur dans le terminal

// connexion à la BDD mongoDB
// ERR à éviter : 127/0.0.1 et non localhost => dépend du bindIp
mongoose.connect("mongodb://127.0.0.1:27017/kfc");

// import des models

// import des routes
const allproducts = require("./routes/products/allproducts");
app.use(allproducts);

const productbytype = require("./routes/products/productbytype");
app.use(productbytype);

const productbytypebyid = require("./routes/products/productbytypebyid");
app.use(productbytypebyid);

const signup = require("./routes/signup/signup");
app.use(signup);

const login = require("./routes/login/login");
app.use(login);

const payment = require("./routes/payment/payment");
app.use(payment);

const orders = require("./routes/orders/orders");
app.use(orders);

const formemail = require("./routes/formemail/formemail");
app.use(formemail);

app.all("*", (req, res) => {
	res.status(404).json("Route introuvable !");
});

// lancement du serveur

app.listen(process.env.PORT, () => {
	console.log("Server has started 🎮");
});
