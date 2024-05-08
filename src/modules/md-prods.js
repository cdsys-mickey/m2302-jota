const getOptionLabel = (option) => {
	if (!option) return "";
	const { ProdID, ProdData } = option;
	if (ProdID === "*") {
		return "*";
	}
	return `${ProdID} ${ProdData}`;
};

const isOptionEqualToValue = (option, value) =>
	option["ProdID"] === value["ProdID"];

const Prods = {
	getOptionLabel,
	isOptionEqualToValue,
};

export default Prods;
