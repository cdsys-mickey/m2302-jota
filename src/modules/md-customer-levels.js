const options = [
	{
		CodeID: "1",
		CodeData: "1",
	},
	{
		CodeID: "2",
		CodeData: "2",
	},
	{
		CodeID: "3",
		CodeData: "3",
	},
	{
		CodeID: "4",
		CodeData: "4",
	},
	{
		CodeID: "5",
		CodeData: "5",
	},
];

const getOptionLabel = (option) => {
	if (!option) return "";
	const { CodeData } = option;
	return `${CodeData}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.CodeID === value?.CodeID;
};

const findById = (id) => {
	return options.find((o) => o.CodeID === id);
};

const CustomerLevels = {
	getOptionLabel,
	isOptionEqualToValue,
	options,
	findById,
};

export default CustomerLevels;
