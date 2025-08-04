import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SDate,
		EDate,
		SCndID,
		ECndID,
		ChkAmt,
		DtlType,
		reportType,
		...rest
	} = payload;
	return {
		JobName: "P63",
		Action: outputType?.id?.toString() ?? "",
		SDate: Forms.formatDate(SDate) ?? "",
		EDate: Forms.formatDate(EDate) ?? "",
		SCndID: SCndID?.CndID ?? "",
		ECndID: ECndID?.CndID ?? "",
		ChkAmt: ChkAmt?.toString() ?? "",
		DtlType: DtlType?.id ?? "",
		RptType: reportType?.id,
		...rest,
	};
};

const P63 = {
	transformForSubmitting,
};

export default P63;
