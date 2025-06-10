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
	const {
		outputType,
		AccYM,
		Stage,
		session,
		CustID,
		RptType,
		retail,
		...rest
	} = payload;

	console.log("ignore props", retail);

	return {
		JobName: "G09",
		Action: outputType?.id?.toString() || "",
		// AccYM: session?.AccYM ?? "",
		// Stage: session?.Stage ?? "",
		AccYM: Forms.formatYearMonth(AccYM) ?? "",
		Stage:
			Stage || (session?.Stage != null ? session.Stage : session || ""),
		...(CustID && {
			CustID: CustID?.CustID,
		}),
		RptType: RptType.id?.toString(),
		...rest,
	};
};

const G09 = {
	transformForSubmitting,
	getOptionLabel,
	isOptionEqualToValue,
};

export default G09;
