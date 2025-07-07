import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SDate,
		EDate,
		// InclTest,
		SProdID,
		EProdID,
		SPDlineID,
		EPDlineID,
		SType,
		reportType,
		orderType,
		...rest
	} = payload;

	// console.log("ignore props", retail);

	return {
		JobName: "H142",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		SProdID: SProdID?.ProdID || "",
		EProdID: EProdID?.ProdID || "",
		SPDlineID: SPDlineID?.CodeID || "",
		EPDlineID: EPDlineID?.CodeID || "",
		SType: SType?.id?.toString() ?? "",
		RptType: reportType?.id,
		OrdName: orderType?.id,
		...rest,
	};
};

const H14_2 = {
	transformForSubmitting,
};

export default H14_2;
