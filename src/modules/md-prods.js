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

const stringify = (option) => {
	return `${option.ProdID} ${option.ProdData} ${option.Barcode}`;
};

const Prods = {
	getOptionLabel,
	isOptionEqualToValue,
	stringify,
};

export default Prods;
