import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SDate,
		EDate,
		STrvID,
		ETrvID,
		ChkAmt,
		RptClass,
		DtlType,
		reportType,
		...rest
	} = payload;
	return {
		JobName: "P61",
		Action: outputType?.id?.toString() ?? "",
		SDate: Forms.formatDate(SDate) ?? "",
		EDate: Forms.formatDate(EDate) ?? "",
		STrvID: STrvID?.TrvID ?? "",
		ETrvID: ETrvID?.TrvID ?? "",
		ChkAmt: ChkAmt?.toString() ?? "",
		RptClass: RptClass?.id ?? "",
		DtlType: DtlType?.id ?? "",
		RptType: reportType?.id,
		...rest,
	};
};

const P61 = {
	transformForSubmitting,
};

export default P61;
