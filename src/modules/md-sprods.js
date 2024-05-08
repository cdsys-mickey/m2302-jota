const getOptionLabel = (option) => {
	if (!option) return "";
	const { SProdID, ProdData } = option;
	if (SProdID === "*") {
		return "*";
	}
	return `${SProdID} ${ProdData}`;
};

const isOptionEqualToValue = (option, value) =>
	option["SProdID"] === value["SProdID"];

const SProds = {
	getOptionLabel,
	isOptionEqualToValue,
};

export default SProds;
