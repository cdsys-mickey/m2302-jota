import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const { outputType, dept, SDate, EDate, OrderBy, ...rest } = payload;
	return {
		JobName: "A28",
		Action: outputType?.id?.toString() ?? "",
		SDate: Forms.formatDate(SDate) ?? "",
		EDate: Forms.formatDate(EDate) ?? "",
		DeptID: dept?.DeptID ?? "",
		OrderBy: OrderBy?.id ?? "",
		...rest,
	};
};

const A28 = {
	transformForSubmitting,
};

export default A28;
