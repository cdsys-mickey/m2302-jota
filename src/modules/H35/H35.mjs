import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SDate,
		EDate,
		SIDeptID,
		EIDeptID,
		reportType,
		orderType,
		...rest
	} = payload;
	return {
		JobName: "H35",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		SIDeptID: SIDeptID?.DeptID || "",
		EIDeptID: EIDeptID?.DeptID || "",
		RptName: reportType?.id,
		OrdName: orderType?.id,
		...rest,
	};
};

const H35 = {
	transformForSubmitting,
};

export default H35;
