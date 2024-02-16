import Forms from "../shared-modules/sd-forms";

const transformForSubmit = (payload) => {
	const { outputType, dept, action, table, ...rest } = payload;
	return {
		DeptID: dept?.DeptID || "",
		Action: outputType?.id || "",
		Doing: action || "",
		RealFile: table?.RealFile || "",
		...(rest && Forms.processDateFieldsForSubmit(rest, "SDate,EDate")),
	};
};

const Actions = ["新增", "修改", "刪除", "狀態", "替換", "其他"];

const A18 = {
	transformForSubmit,
	Actions,
};

export default A18;
