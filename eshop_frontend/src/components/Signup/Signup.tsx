import React, { Dispatch, FC, SetStateAction } from "react";
import "./Signup.module.scss";
import SignupModal from "./SignupModal/SignupModal";
interface SignupProps {
	manageUserCookie: (token: string) => void;
	showSignupModal?: boolean;
	setShowSignupModal: Dispatch<SetStateAction<boolean>>;
	showLoginModal: boolean;
	setShowLoginModal: Dispatch<SetStateAction<boolean>>;
}

const Signup: FC<SignupProps> = ({
	showSignupModal,
	setShowSignupModal,
	manageUserCookie,
	showLoginModal,
	setShowLoginModal,
}: SignupProps) => {
	// console.log(showSignupModal, "<<< showSignupModal");
	return (
		<>
			<a
				className="signup"
				onClick={() => {
					// console.log(showSignupModal, "showSignupModal");
					setShowSignupModal(true);
				}}
			>
				Signup
			</a>
			{showSignupModal && (
				<SignupModal
					showLoginModal={showLoginModal}
					setShowLoginModal={setShowLoginModal}
					showSignupModal={showSignupModal}
					setShowSignupModal={setShowSignupModal}
					manageUserCookie={manageUserCookie}
				/>
			)}
		</>
	);
};

export default Signup;
