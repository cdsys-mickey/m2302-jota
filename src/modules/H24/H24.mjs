import Forms from "@/shared-modules/sd-forms";

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
		JobName: "H24",
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

const H24 = {
	transformForSubmitting,
};

export default H24;

