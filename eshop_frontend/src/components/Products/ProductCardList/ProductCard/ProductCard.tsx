import React, { FC } from "react";
import Button from "../../../common/Button/Button";
import { tProduct } from "../../../../types/types";
import styles from "./ProductCard.module.scss";
import Image from "../../../common/Image/Image";

export interface ProductCardProps {
	price: number;
	image_url: string;
	title: string;
	type: string;
	_id_product: number;
	content?: string;
	hideButton?: boolean;
}

export const ProductCard: FC<ProductCardProps> = ({
	price,
	image_url,
	title,
	type,
	_id_product,
	content,
	hideButton,
}: ProductCardProps): JSX.Element => {
	return (
		<div>
			<div key={_id_product} className={styles.product_card}>
				<div className={styles.image_container}>
					<Image src={image_url} dimensions={"100px"} alt={title} />
				</div>
				<div className={styles.details_container}>
					<h3>{title}</h3>
					{/* <div>Prix : {price.toFixed(2)}€</div> */}
					{content && (
						<div>
							<p className={styles.description}>Description : {content}</p>
						</div>
					)}
				</div>
				{!hideButton && (
					<Button
						content="Aller sur la fiche produit"
						button_url={`/products/${type}/${_id_product}`}
					/>
				)}
			</div>
		</div>
	);
};

export default ProductCard;
