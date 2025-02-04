import Forms from "@/shared-modules/sd-forms";

const transformForSubmitting = (payload) => {
	const {
		Year,
		Season,
		SalType,
		SAreaID,
		EAreaID,
		SLineID,
		ELineID,
		TopNo,
		outputType,
		SDate,
		EDate,
		reportType,
		numbers,
		...rest
	} = payload;
	return {
		JobName: "H11",
		Action: outputType?.id?.toString() || "",
		Year: Forms.formatYear(Year) || "",
		Season: Season || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		SalType: SalType?.id || "",
		SAreaID: SAreaID?.CodeID || "",
		EAreaID: EAreaID?.CodeID || "",
		SLineID: SLineID?.CodeID || "",
		ELineID: ELineID?.CodeID || "",
		TopNo: TopNo,
		RptType: reportType?.id || "",
		Limit: numbers.filter((x) => x != null).map((x) => x?.toString() || ""),
		...rest,
	};
};

const H11 = {
	transformForSubmitting,
};

export default H11;
