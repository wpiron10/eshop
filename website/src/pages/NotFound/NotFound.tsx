import React, { FC } from "react";
import styles from "./NotFound.module.scss";
import Image from "../../components/common/Image/Image";

import error from "../../assets/img/error.jpg";
import Button from "../../components/common/Button/Button";
interface NotFoundProps {}

const NotFound: FC<NotFoundProps> = ({}) => {
	return (
		<section className={styles.not_found_container}>
			<h1>404 Not found</h1>
			<Image src={error} className={styles.error_img} />
			<p>Mauvaise porte, vous êtes arrivé chez le colonel Sanders 🤯</p>
			<Button content={"Retrouver mon chemin"} button_url="/" />
		</section>
	);
};

export default NotFound;
