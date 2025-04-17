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
	const { outputType, EDate, CustID, CustName, Tel, ...rest } = payload;
	return {
		JobName: "G01",
		Action: outputType?.id?.toString() || "",
		EDate: Forms.formatDate(EDate) || "",
		...(CustID && {
			CustID: CustID?.CustID,
		}),
		...(CustName && {
			CustName: `%${CustName}%`,
		}),
		...(Tel && {
			Tel: `%${Tel}%`,
		}),
		...rest,
	};
};

const G01 = {
	transformForSubmitting,
	getOptionLabel,
	isOptionEqualToValue,
};

export default G01;
