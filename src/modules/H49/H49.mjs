import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SDate,
		EDate,
		SProdID,
		EProdID,
		SPDlineID,
		EPDlineID,
		reportType,
		orderType,
		...rest
	} = payload;
	return {
		JobName: "H49",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		SProdID: SProdID?.ProdID || "",
		EProdID: EProdID?.ProdID || "",
		SPDlineID: SPDlineID?.CodeID || "",
		EPDlineID: EPDlineID?.CodeID || "",
		RptType: reportType?.id,
		OrdName: orderType?.id,
		...rest,
	};
};

const H49 = {
	transformForSubmitting,
};

export default H49;
