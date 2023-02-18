import axios, { AxiosResponse } from "axios";
import React, { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import Filter from "../../components/Filters/Filter/Filter";
import { filterContent } from "../../components/Filters/FilterContent";
import Filters from "../../components/Filters/Filters";
import ProductCardList from "../../components/Products/ProductCardList/ProductCardList";
import { tProduct } from "../../types/types";

interface ProductByTypesProps {}

const ProductByTypes: FC<ProductByTypesProps> = ({}) => {
	const { types } = useParams();

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [data, setData] = useState<tProduct[] | undefined>();
	const [isSearchResults, setIsSearchResults] = useState<boolean>(false);

	const [filterChoice, setFilterChoice] = useState<
		| {
				[x: string]: string | number;
		  }
		| undefined
	>(undefined);

	useEffect(() => {
		const getData = async () => {
			try {
				let finalChoice = "";
				let lowerCasedFinalChoice = "";
				if (filterChoice) {
					for (const [key, value] of Object.entries(filterChoice)) {
						if (key === Object.keys(filterChoice)[0]) {
							// finalChoice.concat("?", `${key}=${value}`);
							console.log(`?${key}=${value}`);
							finalChoice = `?${key}=${value}`;
							console.log("ici");
						} else {
							finalChoice += `&${key}=${value}`;
						}
						// console.log(`?${key}=${value}`);
						// console.log(Object.keys(filterChoice)[0], "filterChoice[0]");
					}
					lowerCasedFinalChoice = finalChoice;
				}

				const response: AxiosResponse<any, any> = await axios.get(
					`http://localhost:4000/products/${types}${lowerCasedFinalChoice}`
				);
				console.log(response.data, "response here");
				if (response.data.length) {
					setData(response.data);
					setIsSearchResults(true);
				} else {
					setIsSearchResults(false);
				}
				console.log(data, "data");
				setIsLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		getData();
	}, [types, filterChoice]);

	return (
		<section>
			{isLoading ? (
				<span>En cours de chargement...</span>
			) : (
				<div>
					<h1>Catégorie de produits : {types}</h1>
					<div>
						<Filters
							content={filterContent}
							type={types}
							filterChoice={filterChoice}
							setFilterChoice={setFilterChoice}
						/>
					</div>
					{!isSearchResults ? (
						<div>Aucun résultat pour votre recherche</div>
					) : (
						<div>{data && <ProductCardList data={data} />}</div>
					)}
				</div>
			)}
		</section>
	);
};

export default ProductByTypes;
