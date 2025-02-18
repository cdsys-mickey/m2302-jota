import Forms from "@/shared-modules/sd-forms";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SDate,
		EDate,
		SFactID,
		EFactID,
		SProdID,
		EProdID,
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
		...rest,
	};
};

const H31 = {
	transformForSubmitting,
};

export default H31;
