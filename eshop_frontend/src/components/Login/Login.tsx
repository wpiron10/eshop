import React, { Dispatch, FC, SetStateAction } from "react";
import LoginModal from "./LoginModal/LoginModal";
import "./Login.module.scss";
import { useRootContext } from "../../context/Context.Cart";
interface LoginProps {
	manageUserCookie: (token: string) => void;
	token: string | null;
	setToken: Dispatch<SetStateAction<string | null>>;
	showSignupModal: boolean;
	setShowSignupModal: Dispatch<SetStateAction<boolean>>;
	showLoginModal: boolean;
	setShowLoginModal: Dispatch<SetStateAction<boolean>>;
	// idUser: number | undefined;
	// setIdUser: Dispatch<SetStateAction<number | undefined>>;
}

const Login: FC<LoginProps> = ({
	showLoginModal,
	setShowLoginModal,
	manageUserCookie,
	showSignupModal,
	setShowSignupModal,
	// idUser,
	// setIdUser,
}) => {
	const { idUser, setIdUser } = useRootContext();
	return (
		<>
			<a
				className="login"
				onClick={() => {
					console.log(showLoginModal, "showLoginModal");
					setShowLoginModal(true);
				}}
			>
				Login
			</a>
			{showLoginModal && (
				<LoginModal
					showSignupModal={showSignupModal}
					setShowSignupModal={setShowSignupModal}
					showLoginModal={showLoginModal}
					setShowLoginModal={setShowLoginModal}
					manageUserCookie={manageUserCookie}
					setIdUser={setIdUser}
					idUser={idUser}
				/>
			)}
		</>
	);
};

export default Login;
