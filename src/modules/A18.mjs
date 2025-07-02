import Forms from "../shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const {
		job,
		SDate,
		EDate,
		outputType,
		dept,
		action,
		table,
		operator,
		ipAddr,
		orderBy,
		...rest
	} = payload;
	return {
		...(SDate && {
			SDate: Forms.formatDate(SDate),
		}),
		...(EDate && {
			EDate: Forms.formatDate(EDate),
		}),
		DeptID: dept?.DeptID || "",
		Action: outputType?.id || "",
		...(job && {
			JobID: job.JobID,
		}),
		...(action && {
			Doing: action || "",
		}),
		...(table && {
			RealFile: table?.RealFile || "",
		}),
		...(operator?.LoginName && {
			LoginName: operator?.LoginName,
		}),
		...(ipAddr && {
			IP: ipAddr,
		}),
		...(orderBy && {
			OrderBy: orderBy?.id || "",
		}),
		...rest,
	};
};

const Actions = ["新增", "修改", "刪除", "狀態", "替換", "其他"];

const A18 = {
	transformForSubmitting,
	Actions,
};

export default A18;
