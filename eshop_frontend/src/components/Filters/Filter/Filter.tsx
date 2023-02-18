import React, {
	ChangeEvent,
	Dispatch,
	FC,
	SetStateAction,
	useState,
} from "react";
import { filterChoiceObject } from "../Filters";
import styles from "./Filter.module.scss";
interface FilterProps {
	options: Array<string | number>;
	title: string;
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

const Filter: FC<FilterProps> = ({
	options,
	title,
	filterChoice,
	setFilterChoice,
}: FilterProps) => {
	// const [optionSelected, SetOptionSelected] = useState<string>();
	return (
		<label className={styles.label_container}>
			<select
				name={title}
				onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
					if (filterChoice !== undefined) {
						setFilterChoice({ ...filterChoice, [title]: event.target.value });
					} else {
						setFilterChoice({ [title]: event.target.value });
						console.log(filterChoice, "undefined");
					}
				}}
			>
				<option value="" onClick={() => setFilterChoice(undefined)}>
					-- {title} --
				</option>
				{options.map((option, index) => (
					<option value={option} key={index}>
						{option}
					</option>
				))}
			</select>
		</label>
	);
};

export default Filter;
