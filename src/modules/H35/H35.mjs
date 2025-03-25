import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SDate,
		EDate,
		SODeptID,
		EODeptID,
		reportType,
		orderType,
		...rest
	} = payload;
	return {
		JobName: "H35",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		SODeptID: SODeptID?.DeptID || "",
		EODeptID: EODeptID?.DeptID || "",
		RptName: reportType?.id,
		OrdName: orderType?.id,
		...rest,
	};
};

const H35 = {
	transformForSubmitting,
};

export default H35;
