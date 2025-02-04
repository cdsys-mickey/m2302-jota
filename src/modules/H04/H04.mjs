import Forms from "@/shared-modules/sd-forms";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SDate,
		EDate,
		counter,
		reportType,
		orderType,
		orderDir,
		calType,
		InclTest,
		...rest
	} = payload;
	return {
		JobName: "H04",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		CaseID: counter?.CodeID || "",
		InclTest: InclTest ? "Y" : "N",
		RptType: reportType?.id,
		OrdName: orderType?.id,
		OrdSeq: orderDir?.id,
		Rate: calType?.id,
		...rest,
	};
};

const H04 = {
	transformForSubmitting,
};

export default H04;
