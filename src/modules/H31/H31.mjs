import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SDate,
		EDate,
		SFactID,
		EFactID,
		SProdID,
		EProdID,
		orderType,
		...rest
	} = payload;
	return {
		JobName: "H31",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		SProdID: SProdID?.ProdID || "",
		EProdID: EProdID?.ProdID || "",
		SFactID: SFactID?.FactID || "",
		EFactID: EFactID?.FactID || "",
		OrdName: orderType?.id?.toString() ?? "",
		...rest,
	};
};

const H31 = {
	transformForSubmitting,
};

export default H31;
