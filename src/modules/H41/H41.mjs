import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SDate,
		EDate,
		SProdID,
		EProdID,
		SCustID,
		ECustID,
		SDeptID,
		EDeptID,
		RsnID,
		reportType,
		retail,
		...rest
	} = payload;

	console.log("ignored props", retail);

	return {
		JobName: "H41",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		SProdID: SProdID?.ProdID || "",
		EProdID: EProdID?.ProdID || "",
		SCustID: SCustID?.CustID || "",
		ECustID: ECustID?.CustID || "",
		SDeptID: SDeptID?.DeptID || "",
		EDeptID: EDeptID?.DeptID || "",
		RsnID: RsnID?.CodeID || "",
		RptType: reportType?.id,

		...rest,
	};
};

const H41 = {
	transformForSubmitting,
};

export default H41;
