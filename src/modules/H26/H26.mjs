import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SDate,
		EDate,
		SArrDate,
		EArrDate,
		SProdID,
		EProdID,
		SDeptID,
		EDeptID,
		reportType,
		orderType,
		...rest
	} = payload;
	return {
		JobName: "H26",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		SArrDate: Forms.formatDate(SArrDate) || "",
		EArrDate: Forms.formatDate(EArrDate) || "",
		SProdID: SProdID?.ProdID || "",
		EProdID: EProdID?.ProdID || "",
		SDeptID: SDeptID?.DeptID || "",
		EDeptID: EDeptID?.DeptID || "",
		RptType: reportType?.id,
		OrdName: orderType?.id,
		...rest,
	};
};

const H26 = {
	transformForSubmitting,
};

export default H26;
