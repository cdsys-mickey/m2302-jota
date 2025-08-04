import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SDate,
		EDate,
		AsType,
		STrvID,
		ETrvID,
		SCarID,
		ECarID,
		SCndID,
		ECndID,
		ChkAmt,
		reportType,
		DtlType,
		...rest
	} = payload;
	return {
		JobName: "P54",
		Action: outputType?.id?.toString() ?? "",
		SDate: Forms.formatDate(SDate) ?? "",
		EDate: Forms.formatDate(EDate) ?? "",
		AsType: AsType?.id ?? "",
		STrvID: STrvID?.TrvID ?? "",
		ETrvID: ETrvID?.TrvID ?? "",
		SCarID: SCarID?.CarID ?? "",
		ECarID: ECarID?.CarID ?? "",
		SCndID: SCndID?.CndID ?? "",
		ECndID: ECndID?.CndID ?? "",
		ChkAmt: ChkAmt?.toString() ?? "",
		RptType: reportType?.id,
		DtlType: DtlType?.id ?? "",
		...rest,
	};
};

const P54 = {
	transformForSubmitting,
};

export default P54;
