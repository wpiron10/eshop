import Cookies from "js-cookie";
import styles from "./Payment.module.scss";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import Button from "../../components/common/Button/Button";
import { useNavigate } from "react-router-dom";
import Image from "../../components/common/Image/Image";
import BusinessCard from "../../assets/img/icons/business-card.png";
interface ProductProps {
	stripePromise?: any;
	Elements: any;
	CheckoutForm: any;
}

const Payment = ({ stripePromise, Elements }: ProductProps) => {
	const navigate = useNavigate();

	const getCart: any = localStorage.getItem("Cart");

	const ParsedCart = JSON.parse(getCart);
	console.log(ParsedCart, "ParsedCart");

	const protectioncharges = ParsedCart.total_price * 0.1;
	const total = ParsedCart.total_price + protectioncharges;

	return (
		<section className={styles.section_payment}>
			<Button
				content={"Retour"}
				onClick={() => navigate(-1)}
				className={styles.return_button}
			/>
			<h1>Résumé de la commande</h1>
			<div className={styles.form_payment}>
				<div className={styles.form_card}>
					<span>
						Numéro de la commande : #{ParsedCart.id_order} <br />
					</span>
					<span>Commande : {ParsedCart.total_price.toFixed(2)} € </span>

					<span>Frais de services : {protectioncharges.toFixed(2)} €</span>

					<span>Total : {total.toFixed(2)} €</span>

					<span>
						Il ne vous reste plus qu'une étape avant de déguster nos produits..
						Vous allez payer {total.toFixed(2)} euros (frais de servives
						inclus).
					</span>

					<Elements stripe={stripePromise}>
						<CheckoutForm
							totalPrice={total.toFixed(2)}
							orderNumber={ParsedCart.id_order}
						/>
					</Elements>
				</div>
			</div>
		</section>
	);
};

export default Payment;
