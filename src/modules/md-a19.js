import Forms from "@/shared-modules/sd-forms";

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

const transformForSubmit = (payload) => {
	const {
		outputType,
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
		SDeptID: sdept?.DeptID || "",
		EDeptID: edept?.DeptID || "",
		Action: outputType?.id?.toString() || "",
		SProdID: sprod?.ProdID || "",
		EProdID: eprod?.ProdID || "",
		DataType: dataType.id?.toString() || "3",
		InclInv: transIncluded ? "Y" : "N",
		...(rest && Forms.processDateFieldsForSubmit(rest, "SDate,EDate")),
	};
};

const Actions = ["新增", "修改", "刪除", "狀態", "替換", "其他"];

const A19 = {
	transformForSubmit,
	Actions,
	DataType,
	dataTypeOptions,
	getOptionLabel,
	isOptionEqualToValue,
	getDataTypeById,
};

export default A19;
