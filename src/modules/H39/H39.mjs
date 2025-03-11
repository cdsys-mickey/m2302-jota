import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SProdID,
		EProdID,
		SDate1,
		EDate1,
		SDate2,
		EDate2,
		...rest
	} = payload;
	return {
		JobName: "H39",
		Action: outputType?.id?.toString() || "",
		SProdID: SProdID?.ProdID || "",
		EProdID: EProdID?.ProdID || "",
		SDate1: Forms.formatDate(SDate1) || "",
		EDate1: Forms.formatDate(EDate1) || "",
		SDate2: Forms.formatDate(SDate2) || "",
		EDate2: Forms.formatDate(EDate2) || "",
		...rest,
	};
};

const H39 = {
	transformForSubmitting,
};

export default H39;
