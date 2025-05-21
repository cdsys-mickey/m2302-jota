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
	const { outputType, session, CustID, RptType, retail, ...rest } = payload;

	console.log("ignore props", retail);

	return {
		JobName: "G07",
		Action: outputType?.id?.toString() || "",
		AccYM: session?.CurAccYM ?? "",
		Stage: session?.CurStage ?? "",
		...(CustID && {
			CustID: CustID?.CustID,
		}),
		RptType: RptType.id?.toString(),
		...rest,
	};
};

const G07 = {
	transformForSubmitting,
	getOptionLabel,
	isOptionEqualToValue,
};

export default G07;


