export type filterContentType = [
	{
		optionTitle: string;
		optionList: string[];
		type: string;
	}
];

export const filterContent: filterContentType[] = [
	[
		{
			optionTitle: "Ingredients",
			optionList: ["Poulet", "Poulet épicé"],
			type: "menu",
		},
	],
	[
		{
			optionTitle: "Ingredients",
			optionList: ["Poulet", "Maïs", "Pomme de terre"],
			type: "side",
		},
	],
	[
		{
			optionTitle: "Nutri_score",
			optionList: ["A", "B", "C", "D", "E"],
			type: "global",
		},
	],
	[
		{
			optionTitle: "Allergenes",
			optionList: [
				"Gluten",
				"Soja",
				"Oeuf",
				"Lait",
				"Céleri",
				"Moutarde",
				"Sésame",
				"Aucun",
			],
			type: "global",
		},
	],
];
