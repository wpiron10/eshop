import React, { Dispatch, FC, ReactNode, SetStateAction } from "react";
import Close from "../../../assets/img/icons/Close";
import styles from "./Modal.module.scss";
import ModalContent from "./ModalContent/ModalContent";

interface ModalProps {
	content: JSX.Element;
	showModal?: boolean;
	setShowModal: Dispatch<SetStateAction<boolean>>;
}

const Modal: FC<ModalProps> = ({ showModal, setShowModal, content }) => {
	const closeModal = () => {
		setShowModal(false);
	};
	return (
		<section className={styles.modal_background}>
			<div className={styles.modal_section}>
				<div
					className={styles.icon_close}
					onClick={() => {
						closeModal();
					}}
				>
					<Close
						onClick={() => {
							closeModal();
						}}
					/>
				</div>
				<ModalContent content={content} />
			</div>
		</section>
	);
};

export default Modal;
