import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const { outputType, SDate, EDate, catL, catM, InclTX, InclTest, ...rest } =
		payload;
	return {
		JobName: "H03",
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

const H03 = {
	transformForSubmitting,
};

export default H03;
