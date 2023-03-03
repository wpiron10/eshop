import React, { FC, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import ReactDOM from "react-dom";

import { tProduct } from "../../types/types";
import styles from "./Home.module.scss";
import ProductCardList from "../../components/Products/ProductCardList/ProductCardList";

const Home = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState<tProduct[]>();

	useEffect(() => {
		const getData = async () => {
			try {
				const response: AxiosResponse<any, any> = await axios.get(
					`http://localhost:4000/products`
				);
				setData(response.data);
				console.log(data, "response");
				setIsLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		getData();
	}, []);
	return (
		<>
			<h1 className={styles.title}>All Products</h1>

			{isLoading ? (
				<span>En cours de chargement...</span>
			) : (
				<section>
					<div></div>

					<main className={styles.product_cards}>
						{data && <ProductCardList data={data} />}
					</main>
				</section>
			)}
		</>
	);
};

export default Home;
