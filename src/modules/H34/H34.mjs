import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SDate,
		EDate,
		SDeptID,
		EDeptID,
		SIDeptID,
		EIDeptID,
		reportType,
		orderType,
		...rest
	} = payload;
	return {
		JobName: "H34",
		Action: outputType?.id?.toString() ?? "",
		SDate: Forms.formatDate(SDate) ?? "",
		EDate: Forms.formatDate(EDate) ?? "",
		SDeptID: SDeptID?.DeptID ?? "",
		EDeptID: EDeptID?.DeptID ?? "",
		SIDeptID: SIDeptID?.DeptID ?? "",
		EIDeptID: EIDeptID?.DeptID ?? "",
		RptType: reportType?.id,
		OrdName: orderType?.id,
		...rest,
	};
};

const H34 = {
	transformForSubmitting,
};

export default H34;
