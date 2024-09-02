/**
 * 照理說是用不到?
 * @param {*} option
 * @returns
 */
const getOptionLabel = (option) => {
	if (!option) return "";
	const { 請購單號 } = option;
	if (!請購單號) {
		return "(?)";
	}
	return `${請購單號}`;
};

const isOptionEqualToValue = (option, value) =>
	option["請購單號"] === value["請購單號"];

const renderTagLabel = (option) => option["請購單號"];
const renderOptionLabel = (option) => option["請購單號"];

const PurchaseReqOrders = {
	getOptionLabel,
	isOptionEqualToValue,
	renderTagLabel,
	renderOptionLabel,
};

export default PurchaseReqOrders;
