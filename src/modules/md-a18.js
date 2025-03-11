import Forms from "../shared-modules/Forms.mjs";

const OrderBy = Object.freeze({
	DATE: 1,
	JOB: 2,
	OPERATOR: 3,
});

const options = [
	{ id: OrderBy.DATE, name: "日期" },
	{ id: OrderBy.JOB, name: "作業" },
	{ id: OrderBy.OPERATOR, name: "人員" },
];

const getOptionLabel = (option) => {
	if (!option) return "";
	const { id, name } = option;
	return `${id} ${name}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.id === value?.id;
};

const findById = (id) => {
	return options.find((o) => String(o.id) === String(id));
};

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
	options,
	isOptionEqualToValue,
	findById,
	getOptionLabel,
};

export default A18;
