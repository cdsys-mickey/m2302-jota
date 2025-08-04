import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SDate,
		EDate,
		SCarID,
		ECarID,
		ChkAmt,
		DtlType,
		reportType,
		...rest
	} = payload;
	return {
		JobName: "P62",
		Action: outputType?.id?.toString() ?? "",
		SDate: Forms.formatDate(SDate) ?? "",
		EDate: Forms.formatDate(EDate) ?? "",
		SCarID: SCarID?.CarID ?? "",
		ECarID: ECarID?.CarID ?? "",
		ChkAmt: ChkAmt?.toString() ?? "",
		DtlType: DtlType?.id ?? "",
		RptType: reportType?.id,
		...rest,
	};
};

const P62 = {
	transformForSubmitting,
};

export default P62;
