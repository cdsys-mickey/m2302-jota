import Forms from "@/shared-modules/sd-forms";

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
		JobName: "H15",
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

const H15 = {
	transformForSubmitting,
};

export default H15;
