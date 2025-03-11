import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SDeptID,
		EDeptID,
		SalYM,
		SProdID,
		EProdID,
		InvTx,
		SType,
		RptType,
		...rest
	} = payload;
	return {
		JobName: "U02",
		Action: outputType?.id?.toString() || "",
		SDeptID: SDeptID?.DeptID || "",
		EDeptID: EDeptID?.DeptID || "",
		SalYM: Forms.formatYearMonth(SalYM) || "",
		SProdID: SProdID?.ProdID || "",
		EProdID: EProdID?.ProdID || "",
		InvTx: InvTx ? "Y" : "N",
		SType: SType ? "Y" : "N",
		RptType: RptType.id?.toString() || "1",
		...rest,
	};
};

const U02 = {
	transformForSubmitting,
};

export default U02;
