import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SArrDate,
		EArrDate,
		SProdID,
		EProdID,
		reportType,
		...rest
	} = payload;
	return {
		JobName: "H52",
		Action: outputType?.id?.toString() || "",
		SArrDate: Forms.formatDate(SArrDate) || "",
		EArrDate: Forms.formatDate(EArrDate) || "",
		SProdID: SProdID?.ProdID || "",
		EProdID: EProdID?.ProdID || "",
		RptType: reportType?.id,
		...rest,
	};
};

const H52 = {
	transformForSubmitting,
};

export default H52;
