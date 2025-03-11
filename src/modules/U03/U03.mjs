import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SDeptID,
		EDeptID,
		SDate,
		EDate,
		catL,
		catM,
		InvTx,
		SType,
		RptType,
		...rest
	} = payload;
	return {
		JobName: "U03",
		Action: outputType?.id?.toString() || "",
		SDeptID: SDeptID?.DeptID || "",
		EDeptID: EDeptID?.DeptID || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		LClas: catL?.LClas || "",
		MClas: catM?.MClas || "",
		InvTx: InvTx ? "Y" : "N",
		SType: SType ? "Y" : "N",
		RptType: RptType.id?.toString() || "1",
		...rest,
	};
};

const U03 = {
	transformForSubmitting,
};

export default U03;
