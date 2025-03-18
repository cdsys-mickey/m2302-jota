import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		orderType,
		SDeptID,
		EDeptID,
		SDate,
		EDate,
		SProdID,
		EProdID,
		SType,
		RptType,
		...rest
	} = payload;
	return {
		JobName: "U04",
		Action: outputType?.id?.toString() || "",
		SDeptID: SDeptID?.DeptID || "",
		EDeptID: EDeptID?.DeptID || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		SProdID: SProdID?.ProdID || "",
		EProdID: EProdID?.ProdID || "",
		SType: SType?.id,
		RptType: RptType.id?.toString() || "1",
		OrdName: orderType?.id?.toString(),
		...rest,
	};
};

const U04 = {
	transformForSubmitting,
};

export default U04;
