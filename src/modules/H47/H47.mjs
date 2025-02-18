import Forms from "@/shared-modules/sd-forms";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SDate,
		EDate,
		SProdID,
		EProdID,
		SDeptID,
		EDeptID,
		RsnID,
		reportType,
		orderType,
		...rest
	} = payload;
	return {
		JobName: "H47",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		SProdID: SProdID?.ProdID || "",
		EProdID: EProdID?.ProdID || "",
		SDeptID: SDeptID?.DeptID || "",
		EDeptID: EDeptID?.DeptID || "",
		RsnID: RsnID?.CodeID || "",
		RptType: reportType?.id,
		OrdName: orderType?.id,
		...rest,
	};
};

const H47 = {
	transformForSubmitting,
};

export default H47;
