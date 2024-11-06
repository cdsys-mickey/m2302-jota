// const getTitle = (option) => {
// 	if (!option) return "";
// 	const { ProdData } = option;
// 	return `${ProdData}`;
// };

const getOptionLabel = (option) => {
	if (!option) return "";
	const { ProdID, ProdData } = option;
	if (ProdID === "*") {
		return "*";
	}
	return [ProdID, ProdData].filter(Boolean).join(" ");
};

const getOptionLabelForId = (option) => {
	if (!option) return "";
	const { ProdID } = option;
	return `${ProdID}`;
};

const getTitle = (option) => {
	return option
		? getOptionLabel(option)
		: "直接輸入編號後按 Enter, 或按↓後以編號/條碼/名稱搜尋, Esc 結束搜尋";
};

const renderOptionLabel = (option) => {
	return getOptionLabel(option);
};

const isOptionEqualToValue = (option, value) =>
	option?.["ProdID"] === value?.["ProdID"];

const stringify = (option) => {
	// return `${option.ProdID} ${option.ProdData} ${option.Barcode}`;
	return `${option.ProdID} ${option.ProdData}`;
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
