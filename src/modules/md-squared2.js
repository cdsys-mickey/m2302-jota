const SquaredState = Object.freeze({
	NOT_SQUARED: "1",
	SQUARED: "2",
});

const options = [
	{ id: SquaredState.NOT_SQUARED, label: "未結清" },
	{ id: SquaredState.SQUARED, label: "已結清" },
];

const getOptionLabel = (option) => {
	if (!option) return "";
	const { id, label } = option;
	return `${label}`;
};

const getOptionById = (id) => {
	return options.find((o) => o.id === id);
};

const findOptionByInput = (s) => {
	return options.find((o) => o.id?.toLowerCase() === s?.toLowerCase());
};

const isOptionEqualToValue = (option, value) => {
	return option?.id === value?.id;
};

const getOptionDisabled = (option) => {
	return option.id === SquaredState.SQUARED;
};

const Squared2 = {
	SquaredState,
	options,
	getOptionLabel,
	getOptionById,
	findOptionByInput,
	getOptionDisabled,
	isOptionEqualToValue,
};

export default Squared2;
