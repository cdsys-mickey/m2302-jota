import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SDate,
		EDate,
		SProdID,
		EProdID,
		InclTX,
		InclTest,
		...rest
	} = payload;
	return {
		JobName: "H06",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		SProdID: SProdID?.ProdID || "",
		EProdID: EProdID?.ProdID || "",
		InclTX: InclTX ? "Y" : "N",
		InclTest: InclTest ? "Y" : "N",
		...rest,
	};
};

const H06 = {
	transformForSubmitting,
};

export default H06;
