import Forms from "@/shared-modules/sd-forms";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		retail,
		SalType,
		cust,
		cust2,
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
		SCustID: cust?.CustID || "",
		ECustID: cust2?.CustID || "",
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
