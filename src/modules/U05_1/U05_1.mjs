import Forms from "@/shared-modules/sd-forms";

const transformForSubmitting = (payload) => {
	const { outputType, SDate, EDate, RptType, ...rest } = payload;
	return {
		JobName: "U051",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		RptType: RptType.id?.toString() || "1",
		...rest,
	};
};

const U05_1 = {
	transformForSubmitting,
};

export default U05_1;
