import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const { outputType, SDate, EDate, ...rest } = payload;
	return {
		JobName: "P22",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		...rest,
	};
};

const P22 = {
	transformForSubmitting,
};

export default P22;
