const transformForReading = (payload) => {
	const { Using_N, ...rest } = payload;
	return {
		Using_N: Using_N === "1",
		...rest,
	};
};

const paramsToJsonData = (params) => {
	const where = [];
	return {
		StdWhere: where,
		...(params?.qs && {
			CondData: {
				QS_ID: `${params.qs}%`,
				QS_NAME: `%${params.qs}%`,
			},
		}),
	};
};

const A16 = {
	transformForReading,
	paramsToJsonData,
};

export default A16;
