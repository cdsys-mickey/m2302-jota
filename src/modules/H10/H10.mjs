import Forms from "@/shared-modules/sd-forms";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SDate1,
		EDate1,
		SDate2,
		EDate2,
		SAreaID,
		EAreaID,
		SLineID,
		ELineID,
		SalType,
		TopNo,
		reportType,
		...rest
	} = payload;
	return {
		JobName: "H10",
		Action: outputType?.id?.toString() || "",
		SDate1: Forms.formatDate(SDate1) || "",
		EDate1: Forms.formatDate(EDate1) || "",
		SDate2: Forms.formatDate(SDate2) || "",
		EDate2: Forms.formatDate(EDate2) || "",
		SAreaID: SAreaID?.CodeID || "",
		EAreaID: EAreaID?.CodeID || "",
		SLineID: SLineID?.CodeID || "",
		ELineID: ELineID?.CodeID || "",
		RptType: reportType?.id,
		SalType: SalType?.id || "",
		TopNo: TopNo?.toString() || "",
		...rest,
	};
};

const H10 = {
	transformForSubmitting,
};

export default H10;
