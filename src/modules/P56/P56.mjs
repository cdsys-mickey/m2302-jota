import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SDate,
		EDate,
		SCtAreaID,
		ECtAreaID,
		SCityID,
		ECityID,
		STrvID,
		ETrvID,
		reportType,
		...rest
	} = payload;
	return {
		JobName: "P56",
		Action: outputType?.id?.toString() ?? "",
		SDate: Forms.formatDate(SDate) ?? "",
		EDate: Forms.formatDate(EDate) ?? "",
		SCtAreaID: SCtAreaID?.CodeID ?? "",
		ECtAreaID: ECtAreaID?.CodeID ?? "",
		SCityID: SCityID?.CodeID ?? "",
		ECityID: ECityID?.CodeID ?? "",
		STrvID: STrvID?.TrvID ?? "",
		ETrvID: ETrvID?.TrvID ?? "",
		RptType: reportType?.id,
		...rest,
	};
};

const P56 = {
	transformForSubmitting,
};

export default P56;
