import React, { Dispatch, FC, SetStateAction, useState } from "react";
import cn from "classnames";
import axios from "axios";
import styles from "./SignupModal.module.scss";

import Modal from "../../Modals/Modal/Modal";
import { getRandomNumber } from "../../../utils/getRandomNumber";
import Button from "../../common/Button/Button";
interface SignupProps {
	manageUserCookie: (token: string) => void;
	showSignupModal?: boolean;
	setShowSignupModal?: Dispatch<SetStateAction<boolean>>;
	showLoginModal: boolean | undefined;
	setShowLoginModal: Dispatch<SetStateAction<boolean>>;
}

const SignUpModalJSXContent: FC<SignupProps> = ({
	manageUserCookie,
	setDataProfile,
	showSignupModal,
	setShowSignupModal,
	showLoginModal,
	setShowLoginModal,
}: any) => {
	const [username, manageUserCookiename] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmationPassword, setConfirmationPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState<string>("");

	const fetchData = async (event: React.FormEvent<HTMLFormElement>) => {
		try {
			event.preventDefault();
			setErrorMessage("");

			if (
				username.length > 0 &&
				email.length > 0 &&
				password.length > 0 &&
				confirmationPassword.length > 0
			) {
				if (password === confirmationPassword) {
					const idUser = getRandomNumber();
					const response = await axios.post("http://localhost:4000/signup", {
						username: username,
						email: email,
						password: password,
						passwordConfirmation: confirmationPassword,
						id_user: idUser,
					});

					//state saving token for login/signup
					manageUserCookie(response.data.token);

					//Redirect to login modal
				} else {
					setErrorMessage(
						"Les mots de passe que vous avez entrés ne sont pas identiques."
					);
				}
			} else {
				setErrorMessage("Veuillez remplir tous les champs !");
			}
		} catch (error: any) {
			if (error.response) {
				if (error.response.status === 409) {
					setErrorMessage("Cet email a déjà un compte !");
				}
			} else {
				console.log(error.message);
			}
		}
	};
	return (
		<div className={styles.content_form}>
			<h2>Create your account</h2>

			<form onSubmit={fetchData} className={styles.signup_form}>
				<input
					className={styles.signup_form_input}
					type="text"
					placeholder="Username"
					value={username}
					onChange={(event) => {
						const value = event.target.value;
						manageUserCookiename(value);
					}}
				/>
				<input
					className={styles.signup_form_input}
					type="text"
					placeholder="Email"
					value={email}
					onChange={(event) => {
						const value = event.target.value;
						setEmail(value);
					}}
				/>
				<input
					className={styles.signup_form_input}
					type="text"
					placeholder="Password"
					value={password}
					onChange={(event) => {
						const value = event.target.value;
						setPassword(value);
					}}
				/>
				<input
					className={styles.signup_form_input}
					type="text"
					placeholder="Confirm your password"
					value={confirmationPassword}
					onChange={(event) => {
						const value = event.target.value;
						setConfirmationPassword(value);
					}}
				/>
				<p className={styles.signup_form_terms}>
					En m'inscrivant, je confirme que j'ai lu et accepté les conditions
					générales et la politique de confidentialité de KFC.
				</p>
				{errorMessage.length > 1 && (
					<p className={styles.signup_form_error}>{errorMessage}</p>
				)}
			</form>
			<div className={styles.container_login}>
				<Button content={"Sign up"} type="submit" />
				<span>Déjà inscrit ?</span>
				<Button
					content="Login to your account now!"
					onClick={() => {
						setShowLoginModal(true);
						setShowSignupModal(false);
					}}
				/>
			</div>
		</div>
	);
};
interface SignUpModalProps {
	manageUserCookie: (token: string) => void;
	showSignupModal?: boolean | undefined;
	setShowSignupModal: Dispatch<SetStateAction<boolean>>;
	showLoginModal?: boolean | undefined;
	setShowLoginModal: Dispatch<SetStateAction<boolean>>;
}

export const SignUpModal: FC<SignUpModalProps> = ({
	manageUserCookie,
	setShowLoginModal,
	showLoginModal,
	showSignupModal,
	setShowSignupModal,
}) => {
	return (
		<Modal
			setShowModal={setShowSignupModal}
			content={
				<SignUpModalJSXContent
					manageUserCookie={manageUserCookie}
					setShowLoginModal={setShowLoginModal}
					showLoginModal={showLoginModal}
					showSignupModal={showSignupModal}
					setShowSignupModal={setShowSignupModal}
				/>
			}
		/>
	);
};

export default SignUpModal;
