import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SDate,
		EDate,
		// InclTest,
		SProdID,
		EProdID,
		SDeptID,
		EDeptID,
		SType,
		reportType,
		orderType,
		...rest
	} = payload;

	// console.log("ignore props", retail);

	return {
		JobName: "H143",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		SProdID: SProdID?.ProdID || "",
		EProdID: EProdID?.ProdID || "",
		SDeptID: SDeptID?.DeptID || "",
		EDeptID: EDeptID?.DeptID || "",
		SType: SType?.id?.toString() ?? "",
		RptType: reportType?.id,
		OrdName: orderType?.id,
		...rest,
	};
};

const H14_3 = {
	transformForSubmitting,
};

export default H14_3;
