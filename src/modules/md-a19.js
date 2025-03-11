import Forms from "@/shared-modules/Forms.mjs";

const DataType = Object.freeze({
	PURCHASE: 1,
	SALE: 2,
	STOCK: 3,
});

const dataTypeOptions = [
	{ id: DataType.PURCHASE, name: "進貨量" },
	{ id: DataType.SALE, name: "銷貨量" },
	{ id: DataType.STOCK, name: "庫存量" },
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
	const {
		outputType,
		SDate,
		EDate,
		sdept,
		edept,
		sprod,
		eprod,
		dataType,
		transIncluded,
		// EBarcode,
		// SBarcode,
		// ProdData,
		...rest
	} = payload;
	return {
		JobName: "A19",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		SDeptID: sdept?.DeptID || "",
		EDeptID: edept?.DeptID || "",
		SProdID: sprod?.ProdID || "",
		EProdID: eprod?.ProdID || "",
		DataType: dataType.id?.toString() || "3",
		InclInv: transIncluded ? "Y" : "N",
		...rest,
	};
};

const Actions = ["新增", "修改", "刪除", "狀態", "替換", "其他"];

const A19 = {
	transformForSubmitting,
	Actions,
	DataType,
	dataTypeOptions,
	getOptionLabel,
	isOptionEqualToValue,
	getDataTypeById,
};

export default A19;
