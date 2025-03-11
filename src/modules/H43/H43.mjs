import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SArrDate,
		EArrDate,
		SDeptID,
		EDeptID,
		orderType,
		...rest
	} = payload;
	return {
		JobName: "H43",
		Action: outputType?.id?.toString() || "",
		SArrDate: Forms.formatDate(SArrDate) || "",
		EArrDate: Forms.formatDate(EArrDate) || "",
		SDeptID: SDeptID?.DeptID || "",
		EDeptID: EDeptID?.DeptID || "",
		OrdName: orderType?.id,
		...rest,
	};
};

const H43 = {
	transformForSubmitting,
};

export default H43;
