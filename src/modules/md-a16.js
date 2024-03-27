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
	paramsToJsonData,
};

export default A16;
