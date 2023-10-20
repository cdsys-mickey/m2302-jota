const getOptionLabel = (option) => {
	if (!option) return "";
	const { id, name } = option;
	return `${id} ${name}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.id === value?.id;
};

const Types = Object.freeze({
	"001": "特價",
	"002": "寄賣",
	"003": "飲料水",
	"004": "阿美",
	"005": "團體門票",
	"006": "DIY-七星",
});

const Commission = {
	Types,
	getOptionLabel,
	isOptionEqualToValue,
};

export default Commission;
