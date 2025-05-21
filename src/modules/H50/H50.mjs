import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SDate,
		EDate,
		SProdID,
		EProdID,
		SDeptID,
		EDeptID,
		reportType,
		orderType,
		...rest
	} = payload;
	return {
		JobName: "H50",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		SProdID: SProdID?.ProdID || "",
		EProdID: EProdID?.ProdID || "",
		SDeptID: SDeptID?.DeptID || "",
		EDeptID: EDeptID?.DeptID || "",
		RptType: reportType?.id,
		OrdName: orderType?.id,
		...rest,
	};
};

const H50 = {
	transformForSubmitting,
};

export default H50;
