export interface tOrder {
	date_order: string;
	id_order: number;
	id_user: number;
	products: tProduct[];
	total_price: number;
}

export interface tProduct {
	_id: {
		$oid: string;
	};
	_id_product: number;
	title: string;
	content: string;
	Ingredients: Array<string>;
	price: number;
	quantity: number;
	Nutri_score: string;
	Allergenes: Array<string>;
	size: Array<string>;
	sizes: Array<string>;
	drink: Array<string>;
	drinks: Array<string>;
	side: Array<tProduct>;
	sides: tProduct[];
	image_url: string;
	type: string;
}
