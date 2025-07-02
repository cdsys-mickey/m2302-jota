import Forms from "@/shared-modules/Forms.mjs";

const Tabs = Object.freeze({
	CARRY: "CARRY",
	RESTORE: "RESTORE",
});

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
		ym: Forms.formatYearMonth(session?.AccYM) ?? "",
		sess: session?.Stage ?? "",
		...(CustID && {
			scti: CustID?.CustID,
		}),
	};
};

const transformForRestoreSubmitting = (payload) => {
	const { AccYM, Stage } = payload;
	return {
		ym: Forms.formatYearMonth(AccYM) ?? "",
		sess: Stage ?? "",
	};
};

const G07 = {
	Tabs,
	transformForSubmitting,
	getOptionLabel,
	isOptionEqualToValue,
	transformForRestoreSubmitting,
};

export default G07;
