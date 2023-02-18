import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../common/Button/Button";
import { tOrder, tProduct } from "../../types/types";
import QuantityPicker from "../QuantityPicker/QuantityPicker";
import styles from "./Cart.module.scss";
import emptyCart from "../../assets/img/empty-cart.png";
import Image from "../common/Image/Image";
interface CartProps {
	isEmpty: boolean;
	SetIsEmpty: Dispatch<SetStateAction<boolean>>;
	cartToUpdate: boolean;
	SetCartToUpdate: Dispatch<SetStateAction<boolean>>;
	cartContent: tOrder | undefined;
	SetCartContent: Dispatch<SetStateAction<tOrder | undefined>>;
	numberOfArticles: number;
	SetNumberOfArticles: Dispatch<SetStateAction<number>>;
	displayCart: boolean;
	setDisplayCart: Dispatch<SetStateAction<boolean>>;
}

const Cart = ({
	SetIsEmpty,
	isEmpty,
	cartToUpdate,
	SetCartToUpdate,
	cartContent,
	displayCart,
	setDisplayCart,
	SetCartContent,
	numberOfArticles,
	SetNumberOfArticles,
}: CartProps) => {
	const [quantity, SetQuantity] = useState(1);
	// const [price, Setprice] = useState(0);
	const [totalPrice, SetTotalPrice] = useState(0);

	const getCart: any = localStorage.getItem("Cart");
	const getCartParsed = JSON.parse(getCart);

	useEffect(() => {
		const getData = () => {
			try {
				if (getCart) {
					// SetCartToUpdate(false);
					console.log("ici");

					if (getCart !== cartContent) {
						// SetCartContent(getCartParsed);
						SetIsEmpty(false);
						SetCartToUpdate(true);
						SetNumberOfArticles(getCartParsed.products.length);
						getTotalPriceAmountOfCart(getCartParsed);
					}
				} else {
					console.log("la");
					SetIsEmpty(true);
				}
			} catch (error) {
				console.log(error);
			}
		};
		getData();
	}, [isEmpty, getCart, cartToUpdate, quantity]);

	const removeProduct = (product: any) => {
		const getStringifiedCartToUpdate: any = localStorage.getItem("Cart");
		const getCartParsed = JSON.parse(getStringifiedCartToUpdate);
		if (getCartParsed.products.length === 1) {
			localStorage.removeItem("Cart");
			SetIsEmpty(true);
		} else {
			const spreadGetCartParsed: any = { ...getCartParsed };

			const findIndex = spreadGetCartParsed.products.findIndex(
				(element: tProduct) => {
					return (
						(element._id_product === product._id_product &&
							element.side[0]._id_product === product.side[0]._id_product &&
							element.drink[0] === product.drink[0] &&
							product.type === "menu") ||
						(element._id_product === product._id_product &&
							product.type === "side")
					);
				}
			);

			if (findIndex !== -1) {
				spreadGetCartParsed.products.splice(findIndex, 1);
				const updatedCartStringified = JSON.stringify(spreadGetCartParsed);
				localStorage.setItem("Cart", updatedCartStringified);
				const getCart = localStorage.getItem("Cart");
				SetCartContent(spreadGetCartParsed);
			} else {
				console.log("pas trouvé");
			}
		}
	};

	const deleteAllProducts = () => {
		localStorage.removeItem("Cart");
		SetIsEmpty(true);
	};

	const getTotalPriceAmountOfCart = (Cart: any) => {
		const flatCart = Cart.products
			.map((product: any) => product.price * product.quantity)
			.flat()
			.reduce((acc: any, currentValue: any) => acc + currentValue);

		const getCartParsed = JSON.parse(getCart);

		const spreadOfgetCartParsed = { ...getCartParsed };
		SetTotalPrice(flatCart);
		spreadOfgetCartParsed.total_price = flatCart;
		SetCartContent(spreadOfgetCartParsed);
	};

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
				{isEmpty ? (
					<div className={styles.empty_cart_container}>
						<h3>On dirait bien que votre panier est vide</h3>
						<Image src={emptyCart} className={styles.empty_cart} />
					</div>
				) : (
					<main className={styles.main_cart}>
						<h3>Votre commande en cours : </h3>
						<div className={styles.cart_products_main_container}>
							{cartContent?.products.map((product: any, index: any) => (
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
											addOneQuantityProduct={() => {
												SetQuantity((product.quantity += 1));
												console.log(cartContent, "cartContent");
												const spreadOfCartContent = { ...cartContent };
												const initialTotalPrice =
													spreadOfCartContent.total_price;
												spreadOfCartContent.total_price =
													initialTotalPrice + product.price;
												const stringifiedJSON =
													JSON.stringify(spreadOfCartContent);
												localStorage.setItem("Cart", stringifiedJSON);
											}}
											removeOneQuantityProduct={() => {
												SetQuantity((product.quantity -= 1));

												const spreadOfCartContent = { ...cartContent };
												if (product.quantity === 0) {
													const initialTotalPrice =
														spreadOfCartContent.total_price;
													spreadOfCartContent.total_price =
														initialTotalPrice - product.price;

													const stringifiedJSON =
														JSON.stringify(spreadOfCartContent);

													localStorage.setItem("Cart", stringifiedJSON);
													removeProduct(product);
												} else {
													console.log(cartContent, "cartContent");

													const initialTotalPrice =
														spreadOfCartContent.total_price;
													spreadOfCartContent.total_price =
														initialTotalPrice - 1 * product.price;

													const stringifiedJSON =
														JSON.stringify(spreadOfCartContent);

													localStorage.setItem("Cart", stringifiedJSON);
												}
											}}
										/>

										<Button
											onClick={() => removeProduct(product)}
											content="Delete"
										/>
									</div>
								</div>
							))}
						</div>
						<div>
							<div className={styles.cart_order_product}>
								Total : {totalPrice.toFixed(2)} €
							</div>

							<div className={styles.cart_delete_payment_buttons}>
								<Button
									onClick={() => deleteAllProducts()}
									content="Delete all products"
								/>
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
