import Forms from "@/shared-modules/sd-forms";

const transformForSubmitting = (payload) => {
	const { outputType, ArrDate, SFactID, EFactID, SProdID, EProdID, ...rest } =
		payload;
	return {
		JobName: "H25",
		Action: outputType?.id?.toString() || "",
		ArrDate: Forms.formatDate(ArrDate) || "",
		SFactID: SFactID?.FactID || "",
		EFactID: EFactID?.FactID || "",
		SProdID: SProdID?.ProdID || "",
		EProdID: EProdID?.ProdID || "",

		...rest,
	};
};

const H25 = {
	transformForSubmitting,
};

export default H25;
