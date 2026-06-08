const transformForReading = (payload) => {
	const { CutYM, ...rest } = payload;
	return {
		CutYM,
		...rest,
	};
};

const F07 = {
	transformForReading,
};

export default F07;
