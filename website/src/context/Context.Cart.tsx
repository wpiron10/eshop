import React, { FC } from "react";
import { createContext } from "react";

interface CartContextProps {}

const CartProvider: FC<CartContextProps> = ({}) => {
	const CartContext = createContext("Default Value");
	return (
		<></>
		// <CartContext.Provider value={{ cart }}>
		// {/* {children} */}</CartContext.Provider>
	);
};

// export default CartContext;
