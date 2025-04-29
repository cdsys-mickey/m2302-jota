import Forms from "@/shared-modules/Forms.mjs";

const getOptionLabel = (option) => {
	if (!option) return "";
	const { name } = option;
	return `${name}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.id === value?.id;
};

const transformForSubmitting = (payload) => {
	const { outputType, session, SCustID, ECustID, RptType, retail, ...rest } =
		payload;

	console.log("ignore props", retail);

	return {
		JobName: "G05",
		Action: outputType?.id?.toString() || "",
		AccYM: session?.CurAccYM ?? "",
		Stage: session?.CurStage ?? "",
		...(SCustID && {
			SCustID: SCustID?.CustID,
		}),
		...(ECustID && {
			ECustID: ECustID?.CustID,
		}),
		RptType: RptType.id?.toString(),
		...rest,
	};
};

const G05 = {
	transformForSubmitting,
	getOptionLabel,
	isOptionEqualToValue,
};

export default G05;
