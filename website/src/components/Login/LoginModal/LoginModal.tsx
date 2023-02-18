import React, { Dispatch, FC, SetStateAction, useState } from "react";
import axios from "axios";
import styles from "./LoginModal.module.scss";
import Close from "../../../assets/img/icons/Close";
import Modal from "../../Modals/Modal/Modal";
import { getRandomNumber } from "../../../utils/getRandomNumber";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button/Button";
type LoginModalProps = LoginProps;
const LoginModalJSXContent: FC<LoginProps> = ({
	manageUserCookie,
	setDataProfile,
	showLoginModal,
	showSignupModal,
	setIdUser,
	idUser,
	setShowLoginModal,
	setShowSignupModal,
}: any) => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState<string>("");

	const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		try {
			event.preventDefault();
			// setErrorMessage(false);

			if (email.length > 0 && password.length > 0) {
				const response = await axios.post("http://localhost:4000/login", {
					email,
					password,
				});

				if (response.data.token) {
					manageUserCookie(response.data.token);
					console.log("connexion");

					// setDataProfile(response.data);
					setIdUser(response.data.id_user);
					setShowLoginModal(false);
					console.log(idUser, "id user");
					// redirection
					navigate("/");
					console.log("la", response.data);
				}
			} else {
				setErrorMessage("Veuillez remplir tous les champs !");
			}
		} catch (error: any) {
			if (error.response) {
				console.log(error);
				if (error.response.status) {
					setErrorMessage(error.response.data.message);
				}
			} else {
				console.log(error.message);
			}
		}
	};
	return (
		<section className={styles.section_form}>
			<div>
				<h2>Log in</h2>
				<form onSubmit={handleLogin}>
					<input
						type="text"
						placeholder="Email"
						value={email}
						onChange={(event) => {
							const value = event.target.value;
							setEmail(value);
						}}
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(event) => {
							const value = event.target.value;
							setPassword(value);
						}}
					/>
					{errorMessage.length > 1 && (
						<p style={{ color: "red" }}>{errorMessage}</p>
					)}
					<Button type="submit" value="login" content={"Se connecter"} />
				</form>
				<div className={styles.content_signup}>
					<Button
						content="Vous n'avez pas encore de compte ? "
						onClick={() => {
							setShowLoginModal(false);
							setShowSignupModal(true);
						}}
					/>
					<div>Create an account now!</div>
				</div>
			</div>
		</section>
	);
};

interface LoginProps {
	manageUserCookie: (token: string) => void;
	showLoginModal?: boolean | undefined;
	setShowLoginModal: Dispatch<SetStateAction<boolean>>;
	showSignupModal: boolean | undefined;
	setShowSignupModal: Dispatch<SetStateAction<boolean>>;
	idUser: number | undefined;
	setIdUser: Dispatch<SetStateAction<number | undefined>>;
}

export const LoginModal: FC<LoginModalProps> = ({
	showLoginModal,
	setShowLoginModal,
	manageUserCookie,
	showSignupModal,
	setShowSignupModal,
	idUser,
	setIdUser,
}) => {
	return (
		<Modal
			setShowModal={setShowLoginModal}
			content={
				<LoginModalJSXContent
					manageUserCookie={manageUserCookie}
					setShowLoginModal={setShowLoginModal}
					showLoginModal={showLoginModal}
					showSignupModal={showSignupModal}
					setShowSignupModal={setShowSignupModal}
					setIdUser={setIdUser}
					idUser={idUser}
				/>
			}
		/>
	);
};

export default LoginModal;
