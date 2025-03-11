import Forms from "@/shared-modules/Forms.mjs";

const DataType = Object.freeze({
	SUMMARY: 1,
	DETAIL1: 2,
	DETAIL2: 3,
});

const dataTypeOptions = [
	{ id: DataType.SUMMARY, name: "彙總" },
	{ id: DataType.DETAIL1, name: "明細一" },
	{ id: DataType.DETAIL2, name: "明細二" },
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
	const {
		outputType,
		SDate,
		EDate,
		STime,
		ETime,
		SPosNo,
		EPosNo,
		RptType,
		...rest
	} = payload;
	return {
		JobName: "P02",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		STime: Forms.formatTime(STime) || "",
		ETime: Forms.formatTime(ETime) || "",
		SPosNo: SPosNo?.PosNo || "",
		EPosNo: EPosNo?.PosNo || "",
		RptType: RptType.id?.toString() || "1",
		...rest,
	};
};

const P02 = {
	transformForSubmitting,
	DataType,
	dataTypeOptions,
	getOptionLabel,
	isOptionEqualToValue,
	getDataTypeById,
};

export default P02;
