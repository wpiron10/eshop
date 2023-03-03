import axios, { AxiosResponse } from "axios";
import React, {
	Dispatch,
	FC,
	ReactElement,
	SetStateAction,
	useContext,
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
import RootProvider, { useRootContext } from "../../context/Context.Cart";

interface ProductProps {
	isEmpty: Boolean;
	SetIsEmpty: Dispatch<SetStateAction<boolean>>;
	cartToUpdate: boolean;
	SetCartToUpdate: Dispatch<SetStateAction<boolean>>;
	// cartContent: tOrder | undefined;
	// SetCartContent: any;
	token: string | null;
	// idUser: number | undefined;
	// setIdUser: Dispatch<SetStateAction<number | undefined>>;
}

const Product: FC<ProductProps> = ({
	SetIsEmpty,
	SetCartToUpdate,
}: // idUser,
// SetCartContent,
ProductProps) => {
	const { id, types } = useParams();

	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(true);
	const [dataProduct, setDataProduct] = useState<tProduct[]>();

	const [colorSizeActive, setColorSizeActive] = useState(0);
	const [colorSideActive, setColorSideActive] = useState(0);
	const [colorDrinkActive, setColorDrinkActive] = useState(0);
	const [side, setSide] = useState<tProduct | undefined>();
	const [drink, setDrink] = useState<string>();
	const {
		cartContent,
		handleCart,

		isProductAlreadyInCart,

		size,
		setSize,
	} = useRootContext();
	console.log(useRootContext(), "cart context");
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
											console.log(spreadOfProduct, "spread of product");
											handleCart(spreadOfProduct);
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
