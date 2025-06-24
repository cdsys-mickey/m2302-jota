import AreaTypes from "@/components/AreaPicker/AreaTypes.mjs";

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
			areaType: AreaTypes.findById(Other1) || null,
			...rest,
		};
	});
};

const transformForSubmitting = (rowData) => {
	const { areaType, ...rest } = rowData;
	return {
		Other1: areaType?.id,
		...rest,
	};
};

const createRow = () => ({
	// CodeID: "",
	areaType: null,
	// CodeData: "",
});

const A08 = {
	paramsToJsonData,
	transformForReading,
	transformForSubmitting,
	createRow,
};

export default A08;
