import {
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";
import { Link } from "react-router-dom";
import Button from "../common/Button/Button";
import { tOrder, tProduct } from "../../types/types";
import QuantityPicker from "../QuantityPicker/QuantityPicker";
import styles from "./Cart.module.scss";
import emptyCart from "../../assets/img/empty-cart.png";
import Image from "../common/Image/Image";
import CartContextProvider, {
	useRootContext,
} from "../../context/Context.Cart";
interface CartProps {
	isEmpty: boolean;
	SetIsEmpty: Dispatch<SetStateAction<boolean>>;
	cartToUpdate: boolean;
	SetCartToUpdate: Dispatch<SetStateAction<boolean>>;

	numberOfArticles: number;
	SetNumberOfArticles: Dispatch<SetStateAction<number>>;
	displayCart: boolean;
	setDisplayCart: Dispatch<SetStateAction<boolean>>;
}

const Cart = ({ SetIsEmpty, isEmpty, setDisplayCart }: CartProps) => {
	const { cartContent, handleCart } = useRootContext();
	useEffect(() => {
		console.log(cartContent, "cart context");
		cartContent.length > 0 && SetIsEmpty(false);
	}, []);

	return (
		<>
			<div
				className={styles.cart_global_background}
				onClick={() => setDisplayCart(false)}
			></div>
			<section
				className={styles.cart_section}
				onClick={(e) => e.stopPropagation()}
			>
				<div>
					<div>
						{/* {cartItems.products?.map((product) => (
							<div>{product.title}</div>
						))} */}
					</div>
				</div>
				{isEmpty ? (
					<div className={styles.empty_cart_container}>
						<h3>On dirait bien que votre panier est vide</h3>
						<Image src={emptyCart} className={styles.empty_cart} />
					</div>
				) : (
					<main className={styles.main_cart}>
						<h3>Votre commande en cours : </h3>
						<div className={styles.cart_products_main_container}>
							{cartContent?.map((product: any, index: any) => (
								<div key={index} className={styles.cart_products}>
									<div key={product._id} className={styles.cart_product}>
										<img src={product.image_url} />
										<span>
											<p>{product.title}</p>
											{product.type === "menu" && (
												<div className={styles.customed_items}>
													<span>Sélection : &nbsp;</span>
													<span>
														<u>Taille :</u> {product.size[0]},&nbsp;
													</span>
													<span>
														<u>Side :</u> {product.side[0].title},&nbsp;
													</span>
													<span>
														<u>Boisson : </u> {product.drink[0]}
													</span>
												</div>
											)}
										</span>
										<p>Prix : {product.price.toFixed(2)} €</p>
										<QuantityPicker
											quantity={product.quantity}
											addOneQuantityProduct={() => {}}
											removeOneQuantityProduct={() => {}}
										/>

										<Button
											content="Delete"
											// onClick={() => {
											// 	removeCart(product);
											// }}
										/>
									</div>
								</div>
							))}
						</div>
						<div>
							<div className={styles.cart_order_product}>Total : €</div>

							<div className={styles.cart_delete_payment_buttons}>
								<Button content="Delete all products" />
								<Button button_url="/payment" content="Passer au paiement" />
							</div>
						</div>
					</main>
				)}
			</section>
		</>
	);
};

export default Cart;
