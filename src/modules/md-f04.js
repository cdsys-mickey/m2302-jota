import Forms from "../shared-modules/Forms.mjs";

const DataType = Object.freeze({
	SUMMARY: "1",
	DIFF: "2",
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
	const { ActDate, outputType, PrtType, PrtID, ...rest } = payload;
	return {
		ActDate: Forms.formatDate(ActDate),
		Action: outputType?.id || "",
		PrtType: PrtType?.id || "",
		PrtID: PrtID ? "Y" : "N",
		...rest,
	};
};

const transformForReading = (payload) => {
	const { ActDate, PhyIDs, PrtID, ...rest } = payload;
	return {
		ActDate: Forms.parseDate(ActDate),
		PhyIDs,
		// PrtID: PrtID === "Y",
		// ActDate: Forms.parseDate(ActDate),
		// PrtType: PrtType ? getDataTypeById(PrtType) : null,
		// ...rest,
	};
};

const F04 = {
	transformForSubmitting,
	transformForReading,
	DataType,
	dataTypeOptions,
	getOptionLabel,
	isOptionEqualToValue,
	getDataTypeById,
};

export default F04;
