import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SDate,
		EDate,
		retail,
		SalType,
		SCustID,
		ECustID,
		SAreaID,
		EAreaID,
		SLineID,
		ELineID,
		RptType,
		OrdName,
		InclTest,
		OrdSeq,
		Rate,
		...rest
	} = payload;

	console.log("ignore props", retail);

	return {
		JobName: "P03",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		SalType: SalType?.id || "",
		SCustID: SCustID?.CustID || "",
		ECustID: ECustID?.CustID || "",
		SAreaID: SAreaID?.CodeID || "",
		EAreaID: EAreaID?.CodeID || "",
		SLineID: SLineID?.CodeID || "",
		ELineID: ELineID?.CodeID || "",
		InclTest: InclTest ? "Y" : "N",
		RptType: RptType?.id,
		OrdName: OrdName?.id,
		OrdSeq: OrdSeq?.id,
		Rate: Rate?.id,
		...rest,
	};
};

const P03 = {
	transformForSubmitting,
};

export default P03;
