const Types = Object.freeze({
	1: "烘焙櫃",
	2: "麻糬櫃",
});

const getOptionLabel = (option) => {
	if (!option) return "";
	const { CodeID, CodeData } = option;
	return `${CodeID} ${CodeData}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.CodeID === value?.CodeID;
};

const Counters = {
	Types,
	getOptionLabel,
	isOptionEqualToValue,
};

export default Counters;
