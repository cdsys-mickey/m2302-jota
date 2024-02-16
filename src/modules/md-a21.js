import Forms from "../shared-modules/sd-forms";

const OutputModes = Object.freeze({
	HTML: 1,
	TXT: 2,
});

const options = [
	{ id: OutputModes.HTML, name: "直接檢視" },
	{ id: OutputModes.TXT, name: "文字檔(.txt)" },
];

const getOptionLabel = (option) => {
	if (!option) return "";
	const { name } = option;
	return `${name}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.id === value?.id;
};

const getById = (id) => {
	return options.find((o) => o.id === id);
};

const transformForSubmit = (payload) => {
	const { outputType, dept, withTrackingNumber, ...rest } = payload;
	return {
		DeptID: dept?.DeptID || "",
		Action: outputType?.id || "",
		DelyNo: withTrackingNumber ? "Y" : "N",
		...(rest && Forms.processDateFieldsForSubmit(rest, "SDate,EDate")),
	};
};

const Actions = ["新增", "修改", "刪除", "狀態", "替換", "其他"];

const A21 = {
	transformForSubmit,
	Actions,
	OutputModes,
	options,
	getOptionLabel,
	isOptionEqualToValue,
	getById,
};

export default A21;
