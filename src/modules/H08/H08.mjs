import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		retail,
		SalType,
		SCustID,
		ECustID,
		SDate,
		EDate,
		orderType,
		orderDir,
		InclTest,
		...rest
	} = payload;

	console.log("ignore props", retail);
	return {
		JobName: "H08",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		SalType: SalType?.id || "",
		SCustID: SCustID?.CustID || "",
		ECustID: ECustID?.CustID || "",
		InclTest: InclTest?.id || "",
		OrdName: orderType?.id,
		OrdSeq: orderDir?.id,
		...rest,
	};
};

const H08 = {
	transformForSubmitting,
};

export default H08;
