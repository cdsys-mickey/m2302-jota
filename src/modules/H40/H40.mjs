import Forms from "@/shared-modules/sd-forms";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SDate,
		EDate,
		SPDlineID,
		EPDlineID,
		reportType,
		orderType,
		...rest
	} = payload;
	return {
		JobName: "H40",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		SPDlineID: SPDlineID?.CodeID || "",
		EPDlineID: EPDlineID?.CodeID || "",
		RptType: reportType?.id,
		OrdName: orderType?.id,
		...rest,
	};
};

const H40 = {
	transformForSubmitting,
};

export default H40;
