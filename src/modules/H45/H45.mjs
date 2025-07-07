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
		RsnID,
		reportType,
		orderType,
		...rest
	} = payload;
	return {
		JobName: "H45",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		SProdID: SProdID?.ProdID || "",
		EProdID: EProdID?.ProdID || "",
		SPDlineID: SPDlineID?.CodeID || "",
		EPDlineID: EPDlineID?.CodeID || "",
		RsnID: RsnID?.CodeID || "",
		RptType: reportType?.id,
		OrdName: orderType?.id,
		...rest,
	};
};

const H45 = {
	transformForSubmitting,
};

export default H45;
