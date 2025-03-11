import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SDate,
		EDate,
		SArrDate,
		EArrDate,
		cust,
		cust2,
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
		JobName: "H16",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		SArrDate: Forms.formatDate(SArrDate) || "",
		EArrDate: Forms.formatDate(EArrDate) || "",
		// SalType: SalType?.id || "",
		SProdID: SProdID?.ProdID || "",
		EProdID: EProdID?.ProdID || "",
		SCustID: cust?.CustID || "",
		ECustID: cust2?.CustID || "",
		// InclTest: InclTest?.id || "",
		OrdName: orderType?.id,
		// OrdSeq: orderDir?.id,
		RptType: reportType?.id,
		...rest,
	};
};

const H16 = {
	transformForSubmitting,
};

export default H16;
