export const getCurrentDate = () => {
	const date = new Date();
	const current_date =
		date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

	return current_date;
};
