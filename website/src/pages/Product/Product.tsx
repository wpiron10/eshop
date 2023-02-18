import axios, { AxiosResponse } from "axios";
import React, {
	Dispatch,
	FC,
	ReactElement,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getCurrentDate } from "../../utils/getCurrentDate";
import { getRandomNumber } from "../..//utils/getRandomNumber";
import Button from "../../components/common/Button/Button";
import { tOrder, tProduct } from "../../types/types";

import styles from "./Product.module.scss";
import ProductCard from "../../components/Products/ProductCardList/ProductCard/ProductCard";

interface ProductProps {
	isEmpty: Boolean;
	SetIsEmpty: Dispatch<SetStateAction<boolean>>;
	cartToUpdate: boolean;
	SetCartToUpdate: Dispatch<SetStateAction<boolean>>;
	cartContent: tOrder | undefined;
	SetCartContent: any;
	token: string | null;
	idUser: number | undefined;
	setIdUser: Dispatch<SetStateAction<number | undefined>>;
}

const Product: FC<ProductProps> = ({
	SetIsEmpty,
	SetCartToUpdate,
	idUser,
	SetCartContent,
}: ProductProps) => {
	const { id, types } = useParams();

	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(true);
	const [dataProduct, setDataProduct] = useState<tProduct[]>();

	const [size, setSize] = useState<string | undefined>();
	const [side, setSide] = useState<tProduct | undefined>();
	const [drink, setDrink] = useState<string>();

	const [isProductAlreadyInCart, setIsProductAlreadyInCart] =
		useState<boolean>(false);
	const [colorSizeActive, setColorSizeActive] = useState(0);
	const [colorSideActive, setColorSideActive] = useState(0);
	const [colorDrinkActive, setColorDrinkActive] = useState(0);

	useEffect(() => {
		const getData = async () => {
			try {
				const response: AxiosResponse<any, any> = await axios.get(
					`http://localhost:4000/products/${types}/${id}`
				);

				setDataProduct(response.data);
				console.log(response.data, "response");
				setIsLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		getData();
	}, [isProductAlreadyInCart]);

	const addToCart = (data: tProduct) => {
		const getNewCart = localStorage.getItem("Cart");
		SetCartToUpdate(false);
		const spreadDataProduct = { ...data };
		// o 1 A -- si le panier est vide  : on ajoute le panier en créant la commande
		if (!getNewCart) {
			const newIdUser = idUser ? idUser : getRandomNumber();
			const newIdOrder = getRandomNumber();
			console.log(newIdOrder);
			const currrentStringifiedDate = JSON.stringify(getCurrentDate());
			spreadDataProduct.size.splice(
				0,
				spreadDataProduct.size.length,
				size ? size : spreadDataProduct.size[0]
			);
			spreadDataProduct?.side?.splice(
				0,
				spreadDataProduct.side.length,
				spreadDataProduct.side[0]
			);
			spreadDataProduct.drink?.splice(
				0,
				spreadDataProduct.drink.length,
				spreadDataProduct.drink[0]
			);
			const newOrderToCreate = {
				id_user: newIdUser,
				id_order: newIdOrder,
				total_price: data.price,
				date_order: currrentStringifiedDate,
				products: [spreadDataProduct],
			};
			const stringifiedJSON = JSON.stringify(newOrderToCreate);
			localStorage.setItem("Cart", stringifiedJSON);

			SetIsEmpty(false);
			SetCartToUpdate(true);
		} else {
			// o 1 B -- sil est rempli, on vérifie sil contient le produit :

			const parsedJSON = JSON.parse(getNewCart);

			const findIndex = parsedJSON.products.findIndex((element: tProduct) => {
				return (
					(element._id_product === data._id_product &&
						element.side[0]._id_product === data.side[0]._id_product &&
						element.drink[0] === data.drink[0] &&
						data.type === "menu") ||
					(element._id_product === data._id_product && data.type === "side")
				);
			});

			if (findIndex !== -1) {
				// o 2 A ---  sil le contient, on augmente sa quantité
				parsedJSON.products[findIndex]["quantity"]++; // update de la quantité
				const spreadOfCartContent = { ...parsedJSON };
				const isPriceStandardOrXL = size === "XL" ? data.price + 2 : data.price;
				spreadOfCartContent.total_price += isPriceStandardOrXL;
				const stringifiedJSON = JSON.stringify(spreadOfCartContent);
				localStorage.setItem("Cart", stringifiedJSON);
				SetCartContent(spreadOfCartContent);
				setIsProductAlreadyInCart(false);

				SetCartToUpdate(true);
			} else {
				// o 2 B ---  sinon on l'ajoute
				console.log("produit à ajouter dans le panier");

				const spreadOfParsedJson: any = { ...JSON.parse(getNewCart) };
				const isPriceStandardOrXL = size === "XL" ? data.price + 2 : data.price;
				spreadOfParsedJson.products.splice(
					spreadOfParsedJson.products.length,
					0,
					data
				);
				const initialPrice = spreadOfParsedJson.total_price;
				spreadOfParsedJson.total_price = initialPrice + isPriceStandardOrXL;
				const updatedCart = JSON.stringify(spreadOfParsedJson);
				localStorage.setItem("Cart", updatedCart);
				SetCartContent(spreadOfParsedJson);
				console.log("getNewCart - panier mis à jour ", getNewCart);
			}
		}
	};

	return (
		<section className={styles.section_Product}>
			{isLoading ? (
				<span>En cours de chargement...</span>
			) : (
				<>
					<div className={styles.return_button}>
						<Button content={"Retour"} onClick={() => navigate(-1)} />
					</div>
					<main className={styles.main_product_details}>
						{dataProduct?.map((product: tProduct, index) => (
							<div key={index} className={styles.container_product_details}>
								<div className={styles.product_details}>
									<h1>{product.title}</h1>
									<p>Prix unitaire : {product.price.toFixed(2)}</p>
									<img
										src={product.image_url}
										className={styles.product_image}
									></img>
									<div className={styles.product_additionnal_details}>
										<p>Description : {product.content}</p>
										<p>Allergenes : {product.Allergenes}</p>
										<p>Nutri_score : {product.Nutri_score}</p>
										<p>Type : {product.type}</p>
									</div>
								</div>
								<div>
									{product.type === "menu" && (
										<div>
											<div className={styles.container_product_customize_menu}>
												<h3>Personnalisez votre produit : </h3>

												<div className={styles.option_container}>
													Taille :
													<ul className={styles.option_list}>
														<>
															{product.sizes.map(
																(sizeProduct: string, i: number) => {
																	return (
																		<span
																			style={{
																				backgroundColor:
																					colorSizeActive === i
																						? "grey"
																						: "transparent",
																			}}
																			key={sizeProduct}
																			className={styles.option}
																			onClick={() => {
																				setSize(sizeProduct);
																				setColorSizeActive(i);
																			}}
																		>
																			{product.sizes[i]}
																		</span>
																	);
																}
															)}
														</>
													</ul>
												</div>
												<div>
													Accompagnements :
													<ul className={styles.option_list}>
														{product.sides.map((side: any, i: number) => {
															return (
																<span
																	style={{
																		backgroundColor:
																			colorSideActive === i
																				? "grey"
																				: "transparent",
																	}}
																	key={i}
																	className={styles.option}
																	onClick={() => {
																		setSide(side);
																		setColorSideActive(i);
																	}}
																>
																	{side.title}
																</span>
															);
														})}
													</ul>
												</div>
												<div>
													Boissons :
													<ul className={styles.option_list}>
														{product.drinks?.map((drink: string, i: number) => (
															<span
																style={{
																	backgroundColor:
																		colorDrinkActive === i
																			? "grey"
																			: "transparent",
																}}
																key={drink}
																className={styles.option}
																onClick={() => {
																	setDrink(drink);
																	setColorDrinkActive(i);
																}}
															>
																{drink}
															</span>
														))}
													</ul>
												</div>
											</div>
										</div>
									)}
									<Button
										className={styles.add_to_cart_button}
										content="Ajouter au panier"
										onClick={() => {
											const spreadOfProduct = { ...product };

											if (product.type === "menu") {
												const updateProductIfEmpty = () => {
													if (!side) {
														setSide(spreadOfProduct?.sides[0]);
														spreadOfProduct.side.splice(
															0,
															1,
															spreadOfProduct.sides[0]
														);
													} else {
														spreadOfProduct.side.splice(0, 1, side);
													}

													if (!drink) {
														setDrink(spreadOfProduct.drinks[0]);

														spreadOfProduct.drink.splice(
															0,
															1,
															spreadOfProduct.drinks[0]
														);
													} else {
														spreadOfProduct.drink.splice(0, 1, drink);
													}

													if (!size) {
														setSize(spreadOfProduct.sizes[0]);
														spreadOfProduct.size.splice(
															0,
															1,
															spreadOfProduct.sizes[0]
														);
													} else {
														spreadOfProduct.size.splice(0, 1, size);
													}
												};

												updateProductIfEmpty();
											}
											addToCart(product);
										}}
									/>
								</div>
							</div>
						))}
					</main>
				</>
			)}
		</section>
	);
};
export default Product;
