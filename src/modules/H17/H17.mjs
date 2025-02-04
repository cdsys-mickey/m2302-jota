import Forms from "@/shared-modules/sd-forms";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SArrDate,
		EArrDate,
		cust,
		cust2,
		SalType,
		orderType,
		// orderDir,
		// InclTest,
		SProdID,
		EProdID,
		reportType,
		...rest
	} = payload;
	return {
		JobName: "H17",
		Action: outputType?.id?.toString() || "",
		SArrDate: Forms.formatDate(SArrDate) || "",
		EArrDate: Forms.formatDate(EArrDate) || "",
		SalType: SalType?.id || "",
		SCustID: cust?.CustID || "",
		ECustID: cust2?.CustID || "",
		SProdID: SProdID?.ProdID || "",
		EProdID: EProdID?.ProdID || "",
		// InclTest: InclTest?.id || "",
		OrdName: orderType?.id,
		// OrdSeq: orderDir?.id,
		RptType: reportType?.id,
		...rest,
	};
};

const H17 = {
	transformForSubmitting,
};

export default H17;
