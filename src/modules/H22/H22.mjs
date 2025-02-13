import Forms from "@/shared-modules/sd-forms";

const transformForSubmitting = (payload) => {
	const { outputType, SDate, EDate, SProdID, EProdID, counter, ...rest } =
		payload;
	return {
		JobName: "H22",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		SProdID: SProdID?.ProdID || "",
		EProdID: EProdID?.ProdID || "",
		CaseID: counter?.CodeID || "",
		...rest,
	};
};

const H22 = {
	transformForSubmitting,
};

export default H22;
