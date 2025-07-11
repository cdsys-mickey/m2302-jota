import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SOrdDate,
		EOrdDate,
		SArrDate,
		EArrDate,
		STrvID,
		ETrvID,
		SCarID,
		ECarID,
		reportType,
		...rest
	} = payload;
	return {
		JobName: "P51",
		Action: outputType?.id?.toString() || "",
		SArrDate: Forms.formatDate(SArrDate) || "",
		EArrDate: Forms.formatDate(EArrDate) || "",
		SOrdDate: Forms.formatDate(SOrdDate) || "",
		EOrdDate: Forms.formatDate(EOrdDate) || "",
		STrvID: STrvID?.TrvID || "",
		ETrvID: ETrvID?.TrvID || "",
		SCarID: SCarID?.CarID || "",
		ECarID: ECarID?.CarID || "",
		RptType: reportType?.id,
		...rest,
	};
};

const P51 = {
	transformForSubmitting,
};

export default P51;
