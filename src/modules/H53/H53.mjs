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
		JobName: "H53",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		SProdID: SProdID?.ProdID || "",
		EProdID: EProdID?.ProdID || "",
		SPDlineID: SPDlineID?.ProdID || "",
		EPDlineID: EPDlineID?.ProdID || "",
		OrdName: orderType?.id,
		...rest,
	};
};

const H53 = {
	transformForSubmitting,
};

export default H53;
