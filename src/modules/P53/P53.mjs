import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const { outputType, SDate, EDate, CondName, reportType, ...rest } = payload;
	return {
		JobName: "P53",
		Action: outputType?.id?.toString() ?? "",
		SDate: Forms.formatDate(SDate) ?? "",
		EDate: Forms.formatDate(EDate) ?? "",
		CondName: CondName?.id ?? "",
		RptType: reportType?.id ?? "",
		...rest,
	};
};

const P53 = {
	transformForSubmitting,
};

export default P53;
