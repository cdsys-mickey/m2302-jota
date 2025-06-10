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
		session,
		Stage,
		SCustID,
		ECustID,
		RptType,
		retail,
		AccYM,
		...rest
	} = payload;

	console.log("ignore props", retail);

	return {
		JobName: "G05",
		Action: outputType?.id?.toString() || "",
		// AccYM: AccYM || session?.AccYM ?? "",
		// Stage: session?.Stage ?? "",
		AccYM: Forms.formatYearMonth(AccYM) ?? "",
		Stage:
			Stage || (session?.Stage != null ? session.Stage : session || ""),
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
