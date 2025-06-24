/* eslint-disable no-mixed-spaces-and-tabs */
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
		const { CtAreaID, CtAreaData, ...rest } = i;
		return {
			area: CtAreaID
				? {
						CodeID: CtAreaID,
						CodeData: CtAreaData,
				  }
				: null,
			...rest,
		};
	});
};

const transformForSubmitting = (rowData) => {
	const { area, ...rest } = rowData;
	return {
		Other1: area?.CodeID,
		...rest,
	};
};

const createRow = () => ({
	area: null,
});

const P32 = {
	paramsToJsonData,
	transformForReading,
	transformForSubmitting,
	createRow,
};

export default P32;
