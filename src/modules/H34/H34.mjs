import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const { outputType, SDate, EDate, SDeptID, EDeptID, ...rest } = payload;
	return {
		JobName: "H34",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		SDeptID: SDeptID?.DeptID || "",
		EDeptID: EDeptID?.DeptID || "",
		...rest,
	};
};

const H34 = {
	transformForSubmitting,
};

export default H34;
