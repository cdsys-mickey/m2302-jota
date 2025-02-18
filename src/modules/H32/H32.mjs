import Forms from "@/shared-modules/sd-forms";

const transformForSubmitting = (payload) => {
	const { outputType, SDate, EDate, SFactID, EFactID, ...rest } = payload;
	return {
		JobName: "H32",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		SFactID: SFactID?.FactID || "",
		EFactID: EFactID?.FactID || "",
		...rest,
	};
};

const H32 = {
	transformForSubmitting,
};

export default H32;
