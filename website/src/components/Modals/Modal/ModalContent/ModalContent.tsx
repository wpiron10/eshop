import React, { FC } from "react";

interface ModalContentProps {
	content: JSX.Element;
}

const ModalContent: FC<ModalContentProps> = ({ content }) => {
	return <section className="modal-content">{content}</section>;
};

export default ModalContent;
