import axios from "axios";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button/Button";
import Modal from "../Modal/Modal";
import ModalContent from "../Modal/ModalContent/ModalContent";
import "./EmailModal.module.scss";
// import Close from "../../../assets/img/icons/Close";
interface EmailModalJSXContentProps {}

export const EmailModalJSXContent: FC<EmailModalJSXContentProps> = ({}) => {
	const navigate = useNavigate();

	const [email, setEmail] = useState();
	const [firstname, setFirstname] = useState();
	const [lastname, setLastname] = useState();

	const getCart: any = localStorage.getItem("Cart");
	const parsedGetCart = JSON.parse(getCart);

	// Form to send Order's Email to the customer
	const handleEmailChange = (event: any) => {
		const value = event.target.value;
		setEmail(value);
	};
	const handleFirstnameChange = (event: any) => {
		const value = event.target.value;
		setFirstname(value);
	};
	const handleLastnameChange = (event: any) => {
		const value = event.target.value;
		setLastname(value);
	};

	const handleEmailFormSubmit = async (event: any) => {
		try {
			if (event) {
				event.preventDefault();
				const productsList = parsedGetCart.products
					.flat()
					.map(
						(
							el: any
						) => `<div style="width:100%; display:flex; align-items:center; justify-content:center;"><div style="padding:10px;width:100%; display: flex;  align-items:center; justify-content:center; border-radius:5px; border:1px black solid; margin-bottom:10px">
						<img src=${el.image_url} style="width: 50px; height: 50px; margin-right:10px;"/>
					<div style="margin-right:10px;"><p>Produit : ${el.title}</p></div>
					<div style="margin-right:10px;"><p>Nutri Score : ${el.Nutri_score}</p></div>
					<div style="margin-right:10px;"><p>Allergenes : ${el.Allergenes}</p></div>
					<div style="margin-right:10px;"><p>Quantité : ${el.quantity}</p></div>
					<div style="margin-right:10px;"><p>Prix : ${el.price}</p></div>
					</div style="margin-right:10px;"></div>`
					)
					.join("&nbsp;");

				await axios
					.post("http://localhost:4000/formemail", {
						firstname: firstname,
						lastname: lastname,
						email: email,
						id_order: parsedGetCart.id_order,
						// bill_order: bill_order,
						message:
							`<div style="width:100%;">
						<img src="https://www.airasia.com/aa/images/web-apps/food-merchant/kfc/herobanner-mobile.jpg" width:100%;/>
					<h1>Voici votre récapitulatif de commande : #${parsedGetCart.id_order}!</h1>
					<p>${firstname}, merci pour votre achat.</p> 
					<p>Retrouvez l'historique de votre commande ci-dessous :</p>` +
							productsList +
							`<h3>Prix Total : ${parsedGetCart.total_price.toFixed()} €</h3>
						<h4 style="color:grey;">Vous recevez ce mail de la part de KFC.</h4>
				</div>
				`,
					})
					.then(() => {
						localStorage.removeItem("Cart");
						navigate("/");
					});
			}
		} catch (error: any) {
			if (error) {
				console.log(error.message);
			}
		}
	};
	return (
		<div>
			{/* setShowModal */}
			<h3>Souhaitez vous recevoir votre facture par mail ? </h3>
			<p>Vous avez juste à renseigner vos informations :</p>
			<form onSubmit={handleEmailFormSubmit}>
				<label>
					Prénom :<br />
					<input
						type="text"
						placeholder="Votre Prénom"
						value={firstname}
						onChange={handleFirstnameChange}
					/>
				</label>
				<label>
					Nom :<br />
					<input
						type="text"
						placeholder="Votre Nom"
						value={lastname}
						onChange={handleLastnameChange}
					/>
				</label>
				<label>
					Email :<br />
					<input
						type="email"
						placeholder="Votre email"
						value={email}
						onChange={handleEmailChange}
					/>
				</label>

				<Button type="submit" value="Envoyer" content="Envoyer" />
				<Button
					value="Non merci"
					content="Non merci"
					onClick={() => {
						localStorage.removeItem("Cart");
						navigate(`/order/${parsedGetCart.id_order}`);
					}}
				/>
			</form>
		</div>
	);
};

interface EmailModalProps {
	// showModal: boolean;
	setShowModal: Dispatch<SetStateAction<boolean>>;
}

export const EmailModal: FC<EmailModalProps> = ({
	setShowModal,
}): JSX.Element => {
	return (
		<Modal setShowModal={setShowModal} content={<EmailModalJSXContent />} />
	);
};

export default EmailModal;
