import Forms from "@/shared-modules/sd-forms";

const DataType = Object.freeze({
	SUMMARY: 1,
	DETAIL1: 2,
});

const dataTypeOptions = [
	{ id: DataType.SUMMARY, name: "彙總" },
	{ id: DataType.DETAIL1, name: "明細" },
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
		SDeptID,
		EDeptID,
		SDate,
		EDate,
		SProdID,
		EProdID,
		InvTx,
		SType,
		RptType,
		...rest
	} = payload;
	return {
		JobName: "U01",
		Action: outputType?.id?.toString() || "",
		SDeptID: SDeptID?.DeptID || "",
		EDeptID: EDeptID?.DeptID || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		SProdID: SProdID?.ProdID || "",
		EProdID: EProdID?.ProdID || "",
		InvTx: InvTx ? "Y" : "N",
		SType: SType ? "Y" : "N",
		RptType: RptType.id?.toString() || "1",
		...rest,
	};
};

const U01 = {
	transformForSubmitting,
	DataType,
	dataTypeOptions,
	getOptionLabel,
	isOptionEqualToValue,
	getDataTypeById,
};

export default U01;
