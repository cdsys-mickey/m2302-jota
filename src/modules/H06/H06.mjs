import Forms from "@/shared-modules/sd-forms";

const transformForSubmitting = (payload) => {
	const {
		SDate,
		EDate,
		SalType,
		retail,
		cust,
		cust2,
		SAreaID,
		EAreaID,
		SLineID,
		ELineID,
		SProdID,
		EProdID,
		InclTest,
		outputType,
		orderType,
		orderDir,
		...rest
	} = payload;

	console.log("ignore props", retail);

	return {
		JobName: "H06",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		SalType: SalType?.id || "",
		SCustID: cust?.CustID || "",
		ECustID: cust2?.CustID || "",
		SAreaID: SAreaID?.CodeID || "",
		EAreaID: EAreaID?.CodeID || "",
		SLineID: SLineID?.CodeID || "",
		ELineID: ELineID?.CodeID || "",
		SProdID: SProdID?.ProdID || "",
		EProdID: EProdID?.ProdID || "",
		InclTest: InclTest ? "Y" : "N",
		OrdName: orderType?.id,
		OrdSeq: orderDir?.id,
		...rest,
	};
};

const H06 = {
	transformForSubmitting,
};

export default H06;
