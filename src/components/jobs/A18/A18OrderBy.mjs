const OrderBy = Object.freeze({
	DATE: 1,
	JOB: 2,
	OPERATOR: 3,
});

const options = [
	{ id: OrderBy.DATE, name: "日期" },
	{ id: OrderBy.JOB, name: "作業" },
	{ id: OrderBy.OPERATOR, name: "人員" },
];

const getOptionLabel = (option) => {
	if (!option) return "";
	const { id, name } = option;
	return `${id} ${name}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.id === value?.id;
};

const findById = (id) => {
	return options.find((o) => String(o.id) === String(id));
};

const getOptionById = (id) => {
	return options.find((o) => o.id === id);
};

const getDefaultOption = () => {
	return getOptionById(OrderBy.DATE);
};

const A18OrderBy = {
	options,
	getOptionLabel,
	isOptionEqualToValue,
	findById,
	getDefaultOption,
};

export default A18OrderBy;
