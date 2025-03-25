import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SDate,
		EDate,
		retail,
		cust,
		cust2,
		SProdID,
		EProdID,
		reason,
		reportType,
		SalType,
		...rest
	} = payload;

	console.log("ignore props", retail);

	return {
		JobName: "P09",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		SCustID: cust?.CustID || "",
		ECustID: cust2?.CustID || "",
		SProdID: SProdID?.ProdID || "",
		EProdID: EProdID?.ProdID || "",
		SalType: SalType ? "Y" : "N",
		RsnID: reason?.CodeID || "",
		RptType: reportType?.id,
		...rest,
	};
};

const P09 = {
	transformForSubmitting,
};

export default P09;

