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
		orderType,
		orderDir,
		...rest
	} = payload;
	return {
		JobName: "H01",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		SProdID: SProdID?.ProdID || "",
		EProdID: EProdID?.ProdID || "",
		InclTX: InclTX ? "Y" : "N",
		InclTest: InclTest ? "Y" : "N",
		OrdName: orderType?.id,
		OrdSeq: orderDir?.id,
		...rest,
	};
};

const H01 = {
	transformForSubmitting,
};

export default H01;
