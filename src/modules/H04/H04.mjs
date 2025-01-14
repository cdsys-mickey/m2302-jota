import Forms from "@/shared-modules/sd-forms";

const transformForSubmitting = (payload) => {
	const { outputType, SDate, EDate, catL, catM, InclTX, InclTest, ...rest } =
		payload;
	return {
		JobName: "H04",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		LClas: catL?.LClas || "",
		MClas: catM?.MClas || "",
		InclTX: InclTX ? "Y" : "N",
		InclTest: InclTest ? "Y" : "N",
		...rest,
	};
};

const H04 = {
	transformForSubmitting,
};

export default H04;

