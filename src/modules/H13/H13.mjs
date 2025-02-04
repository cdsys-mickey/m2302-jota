import Forms from "@/shared-modules/sd-forms";

const transformForSubmitting = (payload) => {
	const { outputType, SDate, EDate, InclTest, cust, cust2, ...rest } =
		payload;
	return {
		JobName: "H13",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		SCustID: cust?.CustID || "",
		ECustID: cust2?.CustID || "",
		InclTest: InclTest ? "Y" : "N",
		...rest,
	};
};

const H13 = {
	transformForSubmitting,
};

export default H13;
