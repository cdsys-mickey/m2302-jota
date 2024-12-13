import Forms from "../shared-modules/sd-forms";

const transformForSubmitting = (payload) => {
	const { SDate, EDate, outputType, dept, action, table, ...rest } = payload;
	return {
		SDate: Forms.formatDate(SDate),
		EDate: Forms.formatDate(EDate),
		DeptID: dept?.DeptID || "",
		Action: outputType?.id || "",
		Doing: action || "",
		RealFile: table?.RealFile || "",
		...rest,
	};
};

const Actions = ["新增", "修改", "刪除", "狀態", "替換", "其他"];

const A18 = {
	transformForSubmitting,
	Actions,
};

export default A18;
