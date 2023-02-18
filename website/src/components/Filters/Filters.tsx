import React, { Dispatch, FC, SetStateAction } from "react";
import DeleteFilter from "../../assets/img/icons/delete-filter";
import Button from "../common/Button/Button";
import Image from "../common/Image/Image";
import Filter from "./Filter/Filter";
import { filterContentType } from "./FilterContent";
import styles from "./Filters.module.scss";
export interface filterChoiceObject {
	name: string | number;
}
interface FiltersProps {
	content: Array<filterContentType>;
	type: string | undefined;
	filterChoice:
		| {
				[x: string]: string | number;
		  }
		| undefined;
	setFilterChoice: Dispatch<
		SetStateAction<
			| {
					[x: string]: string | number;
			  }
			| undefined
		>
	>;
}

const Filters: FC<FiltersProps> = ({
	content,
	type,
	filterChoice,
	setFilterChoice,
}) => (
	<section className={styles.section_filters}>
		{content.map((items, index) => (
			<React.Fragment key={index}>
				{items.map(
					(options, index) =>
						(options.type === type || options.type === "global") && (
							<React.Fragment key={index}>
								<Filter
									key={index}
									options={options.optionList}
									title={options.optionTitle}
									filterChoice={filterChoice}
									setFilterChoice={setFilterChoice}
								/>
								<div onClick={() => setFilterChoice(undefined)}>
									<DeleteFilter dimensions="30px" />
								</div>
							</React.Fragment>
						)
				)}
			</React.Fragment>
		))}
		<Button
			content={"Supprimer les filtres"}
			onClick={() => setFilterChoice(undefined)}
		/>
	</section>
);

export default Filters;

// .filter((elem) => elem.type === type)
// 				.map((filter) => (
// 					<Filter options={filter.optionList} title={filter.optionTitle} />
