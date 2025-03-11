import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const { outputType, SDate, EDate, SProdID, EProdID, ...rest } = payload;
	return {
		JobName: "H51",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		SProdID: SProdID?.ProdID || "",
		EProdID: EProdID?.ProdID || "",
		...rest,
	};
};

const H51 = {
	transformForSubmitting,
};

export default H51;
