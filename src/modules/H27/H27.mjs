import Forms from "@/shared-modules/sd-forms";

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
		JobName: "H27",
		Action: outputType?.id?.toString() || "",
		SArrDate: Forms.formatDate(SArrDate) || "",
		EArrDate: Forms.formatDate(EArrDate) || "",
		SDeptID: SDeptID?.DeptID || "",
		EDeptID: EDeptID?.DeptID || "",
		OrdName: orderType?.id,
		...rest,
	};
};

const H27 = {
	transformForSubmitting,
};

export default H27;
