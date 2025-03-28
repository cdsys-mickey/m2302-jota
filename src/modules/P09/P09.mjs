import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SDate,
		EDate,
		retail,
		SCustID,
		ECustID,
		SProdID,
		EProdID,
		InclTest,
		RptType,
		OrdName,
		OrdSeq,
		Rate,
		Source,
		...rest
	} = payload;

	console.log("ignore props", retail);

	return {
		JobName: "P09",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		SCustID: SCustID?.CustID || "",
		ECustID: ECustID?.CustID || "",
		SProdID: SProdID?.ProdID || "",
		EProdID: EProdID?.ProdID || "",
		InclTest: InclTest ? "Y" : "N",
		Source: Source?.id,
		RptType: RptType?.id,
		OrdName: OrdName?.id,
		OrdSeq: OrdSeq?.id,
		Rate: Rate?.id,
		...rest,
	};
};

const P09 = {
	transformForSubmitting,
};

export default P09;
