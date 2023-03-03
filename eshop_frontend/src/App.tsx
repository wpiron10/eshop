import React, { useState } from "react";

// import of scss files

import "./App.scss";
import "./styles/color.scss";
import "./styles/reset.scss";
import "./styles/fonts.scss";

// import of dynamic routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import RootProvider from "./context/Context.Cart";
// import des components
import Header from "./components/Header/Header";
import Orders from "./components/Orders/Orders";
import CheckoutForm from "./components/CheckoutForm/CheckoutForm";
import { tOrder } from "./types/types";

// imports de stripe
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// imports des cookies
import Cookies from "js-cookie";

//import des pages
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Product from "../src/pages/Product/Product";
import Payment from "./pages/Payment/Payment";
import ProductByTypes from "./pages/ProductByTypes/ProductByTypes";

// const [cartItems, setCartItems] = useState<WindowLocalStorage>();

export function App() {
	const [isEmpty, SetIsEmpty] = useState<boolean>(true);
	const [cartToUpdate, SetCartToUpdate] = useState<boolean>(false);
	const [numberOfArticles, SetNumberOfArticles] = useState<number>(0);
	const [stripePromise, setStripePromise] = useState<
		() => Promise<Stripe | null>
	>(() =>
		loadStripe(
			"pk_test_51KxuAMBxNTs3SLsGip2j7SfKjYL8gnhlYHPyZ6QjvxvQvqM636bdwCfH7BcvNo5Azg94oxhdmScWqvpa1XN0MdFn00h8VboA2X"
		)
	);

	// creation d'une fonction de connexion / deconnexion

	const [token, setToken] = useState(Cookies.get("logged") || null);

	const manageUserCookie = (token: string) => {
		if (token) {
			// connexion
			console.log("Création d'un cookie logged pour le sign up");
			Cookies.set("logged", token, { expires: 10 });
			setToken(token);
			console.log(
				"Mise à jour du state token en fonction de la connexion / deconnexion"
			);
		} else {
			// déconnexion
			console.log("Suppression d'un cookie pour le sign up");
			Cookies.remove("logged");
			setToken(null);
		}
	};

	return (
		<RootProvider>
			<Router>
				<Header
					manageUserCookie={manageUserCookie}
					token={token}
					setToken={setToken}
					isEmpty={isEmpty}
					SetIsEmpty={SetIsEmpty}
					cartToUpdate={cartToUpdate}
					SetCartToUpdate={SetCartToUpdate}
					// cartContent={cartContent}
					// SetCartContent={SetCartContent}
					numberOfArticles={numberOfArticles}
					SetNumberOfArticles={SetNumberOfArticles}
					// idUser={idUser}
					// setIdUser={setIdUser}
				/>
				<Routes>
					<Route path="/" element={<Home />} />
					{/* Stripe */}
					<Route
						path="/payment"
						element={
							<Payment
								Elements={Elements}
								stripePromise={stripePromise}
								CheckoutForm={CheckoutForm}
							/>
						}
					/>
					<Route path="/products" element={<Home />} />
					<Route path="/orders/:idUser" element={<Orders />} />
					<Route path="/products/:types" element={<ProductByTypes />} />
					<Route
						path="/products/:types/:id"
						element={
							<Product
								token={token}
								isEmpty={isEmpty}
								SetIsEmpty={SetIsEmpty}
								cartToUpdate={cartToUpdate}
								SetCartToUpdate={SetCartToUpdate}
								// cartContent={cartContent}
								// SetCartContent={SetCartContent}
								// idUser={idUser}
								// setIdUser={setIdUser}
							/>
						}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</RootProvider>
	);
}

export default App;
