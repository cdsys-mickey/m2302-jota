const DataType = Object.freeze({
	SUMMARY: 1,
	DIFF: 2,
});

const dataTypeOptions = [
	{ id: DataType.SUMMARY, name: "總表" },
	{ id: DataType.DIFF, name: "差異表" },
];

const getOptionLabel = (option) => {
	if (!option) return "";
	const { id, name } = option;
	return [id, name].filter(Boolean).join(" ");
};

const isOptionEqualToValue = (option, value) => {
	return option?.id === value?.id;
};

const getDataTypeById = (id) => {
	return dataTypeOptions.find((o) => o.id === id);
};

const transformForSubmitting = (payload) => {
	const { outputType, accEntry, PrtType, ...rest } = payload;
	return {
		JobName: "F06",
		PrtType: PrtType?.id || "",
		Action: outputType?.id || "",
		ActDate: accEntry?.ActDate || "",
		Seq: accEntry?.Seq || "",
		...rest,
	};
};

const F06 = {
	transformForSubmitting,
	DataType,
	dataTypeOptions,
	getOptionLabel,
	isOptionEqualToValue,
	getDataTypeById,
};

export default F06;
