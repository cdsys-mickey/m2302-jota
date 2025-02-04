import Forms from "@/shared-modules/sd-forms";

const transformForSubmitting = (payload) => {
	const {
		SDate,
		EDate,
		retail,
		SalType,
		cust,
		cust2,
		SAreaID,
		EAreaID,
		SLineID,
		ELineID,
		reportType,
		InclTest,
		outputType,
		...rest
	} = payload;

	console.log("ignore props", retail);

	return {
		JobName: "H05",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		SalType: SalType?.id || "",
		SCustID: cust?.CustID || "",
		ECustID: cust2?.CustID || "",
		SAreaID: SAreaID?.CodeID || "",
		EAreaID: EAreaID?.CodeID || "",
		SLineID: SLineID?.CodeID || "",
		ELineID: ELineID?.CodeID || "",
		InclTest: InclTest ? "Y" : "N",
		RptType: reportType?.id,
		...rest,
	};
};

const H05 = {
	transformForSubmitting,
};

export default H05;
