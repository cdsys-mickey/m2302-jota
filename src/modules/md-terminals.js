const getOptionLabel = (option) => {
	if (!option) return "";
	const { PosNo } = option;
	return [PosNo || "(無機號)"].filter(Boolean).join(" ");
};

const isOptionEqualToValue = (option, value) => {
	return option?.PosNo === value?.PosNo;
};

const getOptionKey = (option) => {
	return option?.PosNo;
};

const isOptionChecked = (option, value) => {
	return value.includes(getOptionKey(option));
};

const Terminals = {
	getOptionLabel,
	isOptionEqualToValue,
	getOptionKey,
	isOptionChecked,
};

export default Terminals;
