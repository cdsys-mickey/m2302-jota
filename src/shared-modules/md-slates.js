const CONSTANTS = {
	INIT_AS_EMPTY: [
		{
			type: "paragraph",
			children: [
				{
					text: "",
				},
			],
		},
	],
};

const getEmptyData = () => {
	return Array.from(CONSTANTS.INIT_AS_EMPTY);
};

const Slates = {
	...CONSTANTS,
	getEmptyData,
};

export default Slates;
