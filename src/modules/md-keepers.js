const data = [
	{
		id: "000001",
		name: "林佩宜",
	},
	{
		id: "000002",
		name: "張玉華",
	},
	{
		id: "000026",
		name: "鄧金花",
	},
	{
		id: "000038",
		name: "李芳予",
	},
	{
		id: "000101",
		name: "李昀憶",
	},
];

const getOptionLabel = (option) => {
	if (!option) return "";
	const { id, name } = option;
	return `${id} ${name}`;
};

const isOptionEqualToValue = (option, value) => option["id"] === value["id"];

const Keepers = {
	data,
	getOptionLabel,
	isOptionEqualToValue,
};

export default Keepers;
