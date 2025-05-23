import Forms from "@/shared-modules/Forms.mjs";

const DataType = Object.freeze({
	PURCHASE: 1,
	SALE: 2,
	STOCK: 3,
});

const dataTypeOptions = [
	{ id: DataType.SUMMARY, name: "彙總" },
	{ id: DataType.DETAIL1, name: "明細" },
	{ id: DataType.DETAIL2, name: "明細二" },
];

const getOptionLabel = (option) => {
	if (!option) return "";
	const { name } = option;
	return `${name}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.id === value?.id;
};

const getDataTypeById = (id) => {
	return dataTypeOptions.find((o) => o.id === id);
};

const transformForSubmitting = (payload) => {
	const { outputType, SalYM, SProdID, EProdID, InclTX, InclTest, ...rest } =
		payload;
	return {
		JobName: "H02",
		Action: outputType?.id?.toString() ?? "",
		SalYM: Forms.formatYearMonth(SalYM) ?? "",
		SProdID: SProdID?.ProdID || "",
		EProdID: EProdID?.ProdID || "",
		InclTX: InclTX ? "Y" : "N",
		InclTest: InclTest ? "Y" : "N",
		...rest,
	};
};

const Actions = ["新增", "修改", "刪除", "狀態", "替換", "其他"];

const H02 = {
	transformForSubmitting,
	Actions,
	DataType,
	dataTypeOptions,
	getOptionLabel,
	isOptionEqualToValue,
	getDataTypeById,
};

export default H02;
