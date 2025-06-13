const getOptionLabel = (option) => {
	if (!option) return "";
	const { name } = option;
	return `${name}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.id === value?.id;
};

const transformForSubmitting = (payload) => {
	const { session, CustID } = payload;

	// console.log("ignore props", retail);

	return {
		ym: session?.AccYM ?? "",
		sess: session?.Stage ?? "",
		...(CustID && {
			scti: CustID?.CustID,
		}),
	};
};

const G07 = {
	transformForSubmitting,
	getOptionLabel,
	isOptionEqualToValue,
};

export default G07;
