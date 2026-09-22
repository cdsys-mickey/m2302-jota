import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SDate,
		EDate,
		SalType,
		orderType,
		orderDir,
		InclTest,
		SProdID,
		EProdID,
		reportType,
		employee,
		...rest
	} = payload;
	return {
		JobName: "H07",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		SProdID: SProdID?.ProdID || "",
		EProdID: EProdID?.ProdID || "",
		SalType: SalType?.id || "",
		InclTest: InclTest?.id || "",
		RptType: reportType?.id,
		OrdName: orderType?.id,
		OrdSeq: orderDir?.id,
		EmplIDs: employee.filter((e) => Boolean(e.CodeID)).map((e) => e.CodeID),
		...rest,
	};
};

const H07 = {
	transformForSubmitting,
};

export default H07;
