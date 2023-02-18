import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../Products/ProductCardList/ProductCard/ProductCard";

import styles from "./Orders.module.scss";

interface OrdersProps {}

const Orders: FC<OrdersProps> = ({}) => {
	const [isLoading, setIsLoading] = useState(true);
	const [isEmpty, setIsEmpty] = useState(true);
	const [data, setData]: any | undefined = useState();
	const { idUser } = useParams();
	useEffect(() => {
		const getData = async () => {
			try {
				const response: any = await axios.get(
					`http://localhost:4000/orders/${idUser}`
				);

				if (response.data.length) {
					// const spreadOfData = [...response.data];
					console.log("la", response.data);

					const spreadOfData = [...response.data];
					spreadOfData.forEach((order, i) => {
						order.products = JSON.parse(order.products);
						console.log(order.products.products[i], "order products");
					});
					setData(response.data);
					setIsLoading(false);
					setIsEmpty(false);
				} else {
					setIsLoading(false);
					setIsEmpty(true);
					console.log("ici", response.data);
				}
			} catch (error) {
				setIsEmpty(true);
				console.log(error);
			}
		};
		getData();
	}, []);

	return (
		<div>
			{isLoading ? (
				<span className={styles.comment}>En cours de chargement...</span>
			) : (
				<section className={styles.orders_container}>
					<h1>Récapitulatif de vos commandes : </h1>
					{data.map((order: any, index: number) => (
						<div key={index} className={styles.product_container}>
							<h2> Numéro de commande : #{order.products.id_order}</h2>
							<p>Date de commande : #{order.date_order}</p>
							{/* <p>Prix : {order.total_price} €</p> */}
							<div className={styles.product_list}>
								{order.products.products.map((product: any, index: number) => (
									<React.Fragment key={index}>
										<ProductCard
											price={product.price}
											image_url={product.image_url}
											title={product.title}
											type={product.type}
											_id_product={product._id}
											content={product.content}
											hideButton={true}
										/>
									</React.Fragment>
								))}
							</div>
						</div>
					))}
				</section>
			)}
		</div>
	);
};

export default Orders;
