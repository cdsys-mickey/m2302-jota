import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const { outputType, SDate, EDate, RptType, SDeptID, ...rest } = payload;
	return {
		JobName: "U06",
		Action: outputType?.id?.toString() || "",
		SDeptID: SDeptID?.DeptID || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		RptType: RptType.id?.toString() || "1",
		...rest,
	};
};

const U06 = {
	transformForSubmitting,
};

export default U06;
