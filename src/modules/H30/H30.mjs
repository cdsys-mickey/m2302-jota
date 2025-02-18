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
		JobName: "H30",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		SFactID: SFactID?.FactID || "",
		EFactID: EFactID?.FactID || "",
		SProdID: SProdID?.ProdID || "",
		EProdID: EProdID?.ProdID || "",
		...rest,
	};
};

const H30 = {
	transformForSubmitting,
};

export default H30;
