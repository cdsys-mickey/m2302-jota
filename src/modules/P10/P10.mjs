import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SDate,
		EDate,
		SProdID,
		EProdID,
		RptType,
		OrdName,
		OrdSeq,
		...rest
	} = payload;
	return {
		JobName: "P10",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		SProdID: SProdID?.ProdID || "",
		EProdID: EProdID?.ProdID || "",
		RptType: RptType?.id,
		OrdName: OrdName?.id,
		OrdSeq: OrdSeq?.id,
		...rest,
	};
};

const P10 = {
	transformForSubmitting,
};

export default P10;
