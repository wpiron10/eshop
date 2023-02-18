import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";

import logo from "../../assets/img/logo.webp";
import CartArticles from "../../assets/img/cart.png";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";

import Image from "../common/Image/Image";
import "./Header.module.scss";
import { navContent } from "./navContent";
import Cart from "../Cart/Cart";
import { tOrder } from "../../types/types";

interface HeaderProps {
	setToken: Dispatch<SetStateAction<string | null>>;
	manageUserCookie: any;
	token: string | null;
	isEmpty: boolean;
	SetIsEmpty: Dispatch<SetStateAction<boolean>>;
	cartToUpdate: boolean;
	SetCartToUpdate: Dispatch<SetStateAction<boolean>>;
	cartContent: tOrder | undefined;
	SetCartContent: Dispatch<SetStateAction<tOrder | undefined>>;
	numberOfArticles: number;
	SetNumberOfArticles: Dispatch<SetStateAction<number>>;
	idUser: number | undefined;
	setIdUser: Dispatch<SetStateAction<number | undefined>>;
}

const Header: FC<HeaderProps> = ({
	manageUserCookie,
	token,
	setToken,
	SetIsEmpty,
	isEmpty,
	cartToUpdate,
	SetCartToUpdate,
	cartContent,
	SetCartContent,
	numberOfArticles,
	SetNumberOfArticles,
	idUser,
	setIdUser,
}) => {
	const navigate = useNavigate();

	const [displayCart, setDisplayCart] = useState<boolean>(false);
	const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
	const [showSignupModal, setShowSignupModal] = useState<boolean>(false);

	const getCart = localStorage.getItem("Cart");
	useEffect(() => {
		const updateCartNumberOfItems = () => {
			if (getCart) {
				const parsedCart = JSON.parse(getCart);
				// setIdUser(parsedCart.id_user);
				SetNumberOfArticles(parsedCart.products.length);
			} else {
				SetNumberOfArticles(0);
			}
		};
		updateCartNumberOfItems();
	}, [getCart]);

	return (
		<header className={styles.header}>
			<Link to="/">
				<Image className={styles.logo} dimensions="50" src={logo} />
			</Link>
			<nav className={styles.nav_container}>
				{navContent.map((item) => (
					<li key={item.url} className={styles.menu_btn}>
						<Link to={item.url}>
							<h2>{item.name}</h2>
						</Link>
					</li>
				))}
			</nav>

			{token ? (
				<>
					<Link to={`/orders/${idUser}`}>
						<p>Orders</p>
					</Link>
					<Link
						to="/"
						onClick={() => {
							setToken(null);
							//Déconnexion / redirection vers la homepage
							manageUserCookie(null);
							navigate("/");
						}}
					>
						Déconnexion
					</Link>
				</>
			) : (
				<>
					<Login
						token={token}
						setToken={setToken}
						manageUserCookie={manageUserCookie}
						showLoginModal={showLoginModal}
						setShowLoginModal={setShowLoginModal}
						showSignupModal={showSignupModal}
						setIdUser={setIdUser}
						idUser={idUser}
						setShowSignupModal={setShowSignupModal}
					/>
					<Signup
						showSignupModal={showSignupModal}
						setShowSignupModal={setShowSignupModal}
						manageUserCookie={manageUserCookie}
						showLoginModal={showLoginModal}
						setShowLoginModal={setShowLoginModal}
					/>
				</>
			)}

			<div
				onClick={() => setDisplayCart(!displayCart)}
				className={styles.cart_button}
			>
				<p>Panier</p>
				<Image src={CartArticles} className={styles.cart_articles_img} />
				{displayCart && (
					<Cart
						displayCart={displayCart}
						setDisplayCart={setDisplayCart}
						isEmpty={isEmpty}
						SetIsEmpty={SetIsEmpty}
						cartToUpdate={cartToUpdate}
						SetCartToUpdate={SetCartToUpdate}
						cartContent={cartContent}
						SetCartContent={SetCartContent}
						numberOfArticles={numberOfArticles}
						SetNumberOfArticles={SetNumberOfArticles}
					/>
				)}
				<span className={styles.cart_number_items}>{numberOfArticles}</span>
			</div>
		</header>
	);
};

export default Header;
