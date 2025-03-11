import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SDate,
		EDate,
		SArrDate,
		EArrDate,
		SDeptID,
		EDeptID,
		// SalType,
		orderType,
		// orderDir,
		// InclTest,
		SProdID,
		EProdID,
		reportType,
		retail,
		...rest
	} = payload;

	console.log("ignore props", retail);

	return {
		JobName: "H42",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		SArrDate: Forms.formatDate(SArrDate) || "",
		EArrDate: Forms.formatDate(EArrDate) || "",
		// SalType: SalType?.id || "",
		SProdID: SProdID?.ProdID || "",
		EProdID: EProdID?.ProdID || "",
		SDeptID: SDeptID?.CustID || "",
		EDeptID: EDeptID?.CustID || "",
		// InclTest: InclTest?.id || "",
		OrdName: orderType?.id,
		// OrdSeq: orderDir?.id,
		RptType: reportType?.id,
		...rest,
	};
};

const H42 = {
	transformForSubmitting,
};

export default H42;
