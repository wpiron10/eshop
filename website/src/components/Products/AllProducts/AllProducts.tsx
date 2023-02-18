import { FC } from "react";

import { tProduct } from "../../../types/types";
import styles from "./AllProducts.module.scss";

import ProductCardList from "../ProductCardList/ProductCardList";

interface AllProducts {
	data: tProduct[] | undefined;
}
export const AllProducts: FC<AllProducts> = ({ data }) => {
	return (
		<section>
			<main className={styles.product_cards}>
				{data && <ProductCardList data={data} />}
			</main>
		</section>
	);
};

export default AllProducts;
