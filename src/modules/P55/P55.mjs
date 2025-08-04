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
		SCustTID,
		ECustTID,
		reportType,
		...rest
	} = payload;
	return {
		JobName: "P55",
		Action: outputType?.id?.toString() ?? "",
		SDate: Forms.formatDate(SDate) ?? "",
		EDate: Forms.formatDate(EDate) ?? "",
		SCtAreaID: SCtAreaID?.CodeID ?? "",
		ECtAreaID: ECtAreaID?.CodeID ?? "",
		SCityID: SCityID?.CodeID ?? "",
		ECityID: ECityID?.CodeID ?? "",
		SCustTID: SCustTID?.CodeID ?? "",
		ECustTID: ECustTID?.CodeID ?? "",
		RptType: reportType?.id,
		...rest,
	};
};

const P55 = {
	transformForSubmitting,
};

export default P55;
