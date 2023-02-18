import React, { FC } from "react";

interface CreateEmailFormProps {
	order: any;
}

const CreateEmailForm: FC<CreateEmailFormProps> = ({ order }: any) => {
	return (
		<div>
			<h1>Voici votre récapitulatif de commande : #${order.id_order}!</h1>
			<p>Retrouvez l'historique de votre commande ci-dessous :</p>

			<div>Prix : {order.price}</div>
		</div>
	);
};

export default CreateEmailForm;
