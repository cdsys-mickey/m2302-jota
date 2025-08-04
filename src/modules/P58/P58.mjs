import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SDate,
		EDate,
		SCityID,
		ECityID,
		SCndID,
		ECndID,
		reportType,
		...rest
	} = payload;
	return {
		JobName: "P58",
		Action: outputType?.id?.toString() ?? "",
		SDate: Forms.formatDate(SDate) ?? "",
		EDate: Forms.formatDate(EDate) ?? "",
		SCityID: SCityID?.CodeID ?? "",
		ECityID: ECityID?.CodeID ?? "",
		SCndID: SCndID?.CndID ?? "",
		ECndID: ECndID?.CndID ?? "",
		RptType: reportType?.id,
		...rest,
	};
};

const P58 = {
	transformForSubmitting,
};

export default P58;
