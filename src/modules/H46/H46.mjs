import Forms from "@/shared-modules/sd-forms";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SDate,
		EDate,
		SProdID,
		EProdID,
		SDeptID,
		EDeptID,
		RsnID,
		reportType,
		...rest
	} = payload;
	return {
		JobName: "H46",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		SProdID: SProdID?.ProdID || "",
		EProdID: EProdID?.ProdID || "",
		SDeptID: SDeptID?.DeptID || "",
		EDeptID: EDeptID?.DeptID || "",
		RsnID: RsnID?.CodeID || "",
		RptType: reportType?.id,
		...rest,
	};
};

const H46 = {
	transformForSubmitting,
};

export default H46;
