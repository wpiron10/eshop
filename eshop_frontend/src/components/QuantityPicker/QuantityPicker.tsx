import React, { FC } from "react";
import styles from "./QuantityPicker.module.scss";

interface QuantityPickerProps {
	quantity: number;
	addOneQuantityProduct: () => void;
	removeOneQuantityProduct: () => void;
}

const QuantityPicker: FC<QuantityPickerProps> = ({
	quantity,
	addOneQuantityProduct,
	removeOneQuantityProduct,
}) => {
	return (
		<section className={styles.quantity_picker_section}>
			<button
				onClick={removeOneQuantityProduct}
				className={styles.circle_button}
			>
				-
			</button>
			<p>{quantity}</p>
			<button
				onClick={addOneQuantityProduct}
				disabled={quantity > 9}
				className={styles.circle_button}
			>
				+
			</button>
		</section>
	);
};

export default QuantityPicker;
