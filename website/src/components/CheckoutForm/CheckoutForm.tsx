// src/CheckoutForm.js
import { SetStateAction, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import styles from "./CheckoutForm.module.scss";
import axios from "axios";
import { cp } from "fs/promises";
import CreateEmailForm from "./CreateEmailForm";
import Button from "../common/Button/Button";
// import Product from "../../pages/Product/Product/Product";
import ReactPDF from "@react-pdf/renderer";
import EmailModal from "../Modals/EmailModal/EmailModal";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ totalPrice, orderNumber }: any) => {
	const stripe = useStripe();
	const elements = useElements();
	const navigate = useNavigate();

	const [showModal, setShowModal] = useState(false);
	const [isCompleted, setIsCompleted] = useState(false);

	const getCart: any = localStorage.getItem("Cart");
	const parsedGetCart: any = JSON.parse(getCart);
	console.log(parsedGetCart, "parsed get cart");
	const getLogged: any = localStorage.getItem("logged");
	const parsedGetLogged: any = JSON.parse(getLogged);

	const handlePaymentFormSubmit = async (event: {
		preventDefault: () => void;
	}) => {
		try {
			event.preventDefault();

			// On récupère ici les données bancaires que l'utilisateur rentre
			const cardElement: any = elements?.getElement(CardElement);
			console.log(cardElement, "cardElement");

			// Demande de création d'un token via l'API Stripe
			// On envoie les données bancaires dans la requête
			const stripeResponse = await stripe?.createToken(cardElement, {
				name: "L'id de l'acheteur",
			});
			console.log(stripeResponse, "stripeResponse");
			const token: any = stripeResponse?.token?.id;
			console.log(token, "token");
			console.log(typeof token, "token");
			// Une fois le token reçu depuis l'API Stripe
			// Requête vers notre serveur
			// On envoie le token reçu depuis l'API Stripe

			const getCart: any = localStorage.getItem("Cart");

			console.log(getCart, "getcart before req");
			const response = await axios.post("http://localhost:4000/payment", {
				amount: Number(totalPrice * 100).toFixed(),
				// title: "title",
				description: getCart,
				token: token,
			});
			console.log(response.data);
			// Si la réponse du serveur est favorable, la transaction a eu lieu
			if (response.data) {
				setIsCompleted(true);
				setShowModal(true);
				console.log("Succés");
			} else {
				setIsCompleted(false);
				setShowModal(false);
				alert("Erreur durant le paiement");
				console.log("Fail");
			}
		} catch (error: any) {
			console.log(error.message, "error");
		}
	};
	// const getCart: any = localStorage.getItem("Cart");

	return (
		<section className={styles.section_checkout}>
			{!isCompleted ? (
				<form
					onSubmit={handlePaymentFormSubmit}
					className={styles.card_element_form}
				>
					<CardElement className={styles.card_element_checkout} />

					<Button type="submit" content={"Valider le paiement"} />
				</form>
			) : (
				<>
					<span>✅ Paiement effectué ! </span>
					{/* {parsedGetLogged && ( */}
					<Button
						onClick={() => {
							navigate(`/orders/${parsedGetCart.id_user}`);
							localStorage.removeItem("Cart");
						}}
						content={"Consulter mon récapitulatif de commande"}
					/>
					{/* )} */}

					{showModal && <EmailModal setShowModal={setShowModal} />}
				</>
			)}
		</section>
	);
};

export default CheckoutForm;
