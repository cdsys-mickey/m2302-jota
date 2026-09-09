import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SDate1,
		EDate1,
		SDate2,
		EDate2,
		SalType,
		orderDir,
		employee,
		...rest
	} = payload;
	return {
		JobName: "H07A",
		Action: outputType?.id?.toString() || "",
		SDate1: Forms.formatDate(SDate1) || "",
		EDate1: Forms.formatDate(EDate1) || "",
		SDate2: Forms.formatDate(SDate2) || "",
		EDate2: Forms.formatDate(EDate2) || "",
		SalType: SalType?.id || "",
		OrdSeq: orderDir?.id,
		EmplIDs: employee.filter((e) => Boolean(e.CodeID)).map((e) => e.CodeID),
		...rest,
	};
};

const H07A = {
	transformForSubmitting,
};

export default H07A;
