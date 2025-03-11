import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SDate,
		EDate,
		SProdID,
		EProdID,
		Times,
		Minus,
		orderType,
		...rest
	} = payload;
	return {
		JobName: "H44",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		SProdID: SProdID?.ProdID || "",
		EProdID: EProdID?.ProdID || "",
		Minus: Minus ? "Y" : "N",
		Times: Times?.toString() || "",
		OrdName: orderType?.id || "",
		...rest,
	};
};

const H44 = {
	transformForSubmitting,
};

export default H44;
