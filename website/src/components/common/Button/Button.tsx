import React, { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.scss";

interface ButtonProps {
	content: string;
	className?: string | undefined;
	button_url?: string;
	type?: any | undefined;
	value?: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const Button: FC<ButtonProps> = ({
	content,
	className,
	button_url,
	onClick,
	type,
	value,
}) => {
	return button_url ? (
		<Link to={button_url}>
			<button
				className={className ? className : styles.basic_button}
				onClick={onClick}
			>
				{content}
			</button>
		</Link>
	) : (
		<button
			className={className ? className : styles.basic_button}
			onClick={onClick}
			type={type ? type : "text"}
			value={value ? value : ""}
		>
			{content}
		</button>
	);
};

export default Button;
