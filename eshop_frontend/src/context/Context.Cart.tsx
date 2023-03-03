import { createContext, useContext, useState } from "react";
import { tOrder, tProduct } from "../types/types";
import { getCurrentDate } from "../utils/getCurrentDate";
import { getRandomNumber } from "../utils/getRandomNumber";

const getNewCart = localStorage.getItem("Cart");

let parsedCart = null;
if (typeof getNewCart === "string") {
	parsedCart = JSON.parse(getNewCart);
}
const RootContext = createContext(parsedCart ?? null);
const { Provider } = RootContext;
interface RootProviderProps {
	children: React.ReactNode;
}

export default function RootProvider({ children }: RootProviderProps) {
	const [cart, setCart] = useState<tOrder[]>([]);
	const [cartContent, SetCartContent] = useState<tOrder | undefined>();

	const [isProductAlreadyInCart, setIsProductAlreadyInCart] =
		useState<boolean>(false);
	const [size, setSize] = useState<string | undefined>();
	console.log(cart, "caart");
	// const handleCart = (product: tProduct) => setCart([...cart, product]);
	const [idUser, setIdUser] = useState<number | undefined>();

	const handleCart = (data: tProduct) => {
		const getNewCart = localStorage.getItem("Cart");
		// SetCartToUpdate(false);
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

			// SetIsEmpty(false);
			// SetCartToUpdate(true);
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

				// SetCartToUpdate(true);
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
		<Provider
			value={{
				cartContent,
				handleCart,
				isProductAlreadyInCart,
				size,
				setSize,
			}}
		>
			{children}
		</Provider>
	);
}

export function useRootContext() {
	const {
		cartContent,
		handleCart,
		idUser,
		setIdUser,
		size,
		setSize,
		isProductAlreadyInCart,
	} = useContext(RootContext);

	return {
		cartContent,
		handleCart,
		size,
		idUser,
		setIdUser,
		setSize,
		isProductAlreadyInCart,
	};
}
