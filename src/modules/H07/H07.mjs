import Forms from "@/shared-modules/sd-forms";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SDate,
		EDate,
		SalType,
		orderType,
		orderDir,
		InclTest,
		SProdID,
		EProdID,
		...rest
	} = payload;
	return {
		JobName: "H07",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		SalType: SalType?.id || "",
		SProdID: SProdID?.ProdID || "",
		EProdID: EProdID?.ProdID || "",
		InclTest: InclTest?.id || "",
		OrdName: orderType?.id,
		OrdSeq: orderDir?.id,
		...rest,
	};
};

const H07 = {
	transformForSubmitting,
};

export default H07;
