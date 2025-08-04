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
		SCarID,
		ECarID,
		SCustTID,
		ECustTID,
		reportType,
		...rest
	} = payload;
	return {
		JobName: "P57",
		Action: outputType?.id?.toString() ?? "",
		SDate: Forms.formatDate(SDate) ?? "",
		EDate: Forms.formatDate(EDate) ?? "",
		SCtAreaID: SCtAreaID?.CodeID ?? "",
		ECtAreaID: ECtAreaID?.CodeID ?? "",
		SCityID: SCityID?.CodeID ?? "",
		ECityID: ECityID?.CodeID ?? "",
		SCarID: SCarID?.CodeID ?? "",
		ECarID: ECarID?.CodeID ?? "",
		SCustTID: SCustTID?.CodeID ?? "",
		ECustTID: ECustTID?.CodeID ?? "",
		RptType: reportType?.id,
		...rest,
	};
};

const P57 = {
	transformForSubmitting,
};

export default P57;
