const getTitle = (option) => {
	if (!option) return "";
	const { ProdData } = option;
	return `${ProdData}`;
};

const getOptionLabel = (option) => {
	if (!option) return "";
	const { ProdID, ProdData } = option;
	if (ProdID === "*") {
		return "*";
	}
	return `${ProdID} ${ProdData}`;
};

const getOptionLabelForId = (option) => {
	if (!option) return "";
	const { ProdID } = option;
	if (ProdID === "*") {
		return "*";
	}
	return `${ProdID}`;
};

const renderOptionLabel = (option) => {
	return getOptionLabel(option);
};

const isOptionEqualToValue = (option, value) =>
	option?.["ProdID"] === value?.["ProdID"];

const stringify = (option) => {
	return `${option.ProdID} ${option.ProdData} ${option.Barcode}`;
};

const Prods = {
	getOptionLabel,
	getOptionLabelForId,
	isOptionEqualToValue,
	stringify,
	getTitle,
	renderOptionLabel,
};

export default Prods;
