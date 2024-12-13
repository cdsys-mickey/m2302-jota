const transformForReading = (payload) => {
	const { CutYM } = payload;
	return {
		CutYM,
	};
};

const F07 = {
	transformForReading,
};

export default F07;
