import AreaTypes from "./md-area-types";

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

const transformForReading = (payload) => {
	if (!payload.data) {
		return [];
	}
	return payload.data.map((i) => {
		const { Other1, ...rest } = i;
		return {
			areaType: AreaTypes.getById(Other1),
			...rest,
		};
	});
};

const transformForSubmitting = (rowData) => {
	const { areaType, ...rest } = rowData;
	return {
		...(areaType?.id && {
			Other1: areaType?.id,
		}),
		...rest,
	};
};

const A08 = {
	paramsToJsonData,
	transformForReading,
	transformForSubmitting,
};

export default A08;
