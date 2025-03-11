import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SDeptID,
		EDeptID,
		SDate,
		EDate,
		SProdID,
		EProdID,
		InvTx,
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
		InvTx: InvTx ? "Y" : "N",
		SType: SType ? "Y" : "N",
		RptType: RptType.id?.toString() || "1",
		...rest,
	};
};

const U04 = {
	transformForSubmitting,
};

export default U04;
