const SquaredState = Object.freeze({
	NONE: "",
	MARK_AS_SQUARED: "Y",
	SQUARED: "*",
});

const squaredOptions = [
	{ id: SquaredState.NONE, label: "未結清" },
	{ id: SquaredState.MARK_AS_SQUARED, label: "結清" },
	{ id: SquaredState.SQUARED, label: "進貨已結清" },
];

const getSquaredOptionLabel = (option) => {
	if (!option) return "";
	const { id, label } = option;
	return `[${id || "  "}] ${label}`;
};

const getSquaredOptionById = (id) => {
	return squaredOptions.find((o) => o.id === id);
};

const findSquaredOptionByInput = (s) => {
	return squaredOptions.find((o) => o.id?.toLowerCase() === s?.toLowerCase());
};

const getSquaredOptionDisabled = (option) => {
	return option.id === SquaredState.SQUARED;
};

const Squared = {
	SquaredState,
	squaredOptions,
	getSquaredOptionLabel,
	getSquaredOptionById,
	findSquaredOptionByInput,
	getSquaredOptionDisabled,
};

export default Squared;
