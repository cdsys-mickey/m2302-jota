import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SDate,
		EDate,
		SalType,
		retail,
		SCustID,
		ECustID,
		// InclTest,
		SProdID,
		EProdID,
		SType,
		reportType,
		orderType,
		...rest
	} = payload;

	console.log("ignore props", retail);

	return {
		JobName: "H141",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		SalType: SalType ? "Y" : "N",
		SProdID: SProdID?.ProdID || "",
		EProdID: EProdID?.ProdID || "",
		// InclTest: InclTest?.id || "",
		SType: SType?.id?.toString() ?? "",
		SCustID: SCustID?.CustID || "",
		ECustID: ECustID?.CustID || "",
		RptType: reportType?.id,
		OrdName: orderType?.id,
		...rest,
	};
};

const H14_1 = {
	transformForSubmitting,
};

export default H14_1;
