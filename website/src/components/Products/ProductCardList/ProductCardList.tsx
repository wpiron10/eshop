import React, { FC } from "react";
import { tProduct } from "../../../types/types";
import { ProductCard } from "./ProductCard/ProductCard";
import styles from "./ProductCardList.module.scss";

export interface ProductCardListProps {
	data: tProduct[];
}

const ProductCardList: FC<ProductCardListProps> = ({
	data,
}: ProductCardListProps): JSX.Element => {
	return (
		<section className={styles.product_cards}>
			{data?.map((product: tProduct) => (
				<React.Fragment key={product._id_product}>
					<ProductCard
						price={product.price}
						image_url={product.image_url}
						title={product.title}
						type={product.type}
						_id_product={product._id_product}
					/>
				</React.Fragment>
			))}
		</section>
	);
};

export default ProductCardList;
