const getOptionLabel = (option) => {
	if (!option) return "";
	const { ActDate, Seq, PhyIDs } = option;
	const id = `${ActDate}#${Seq}`;
	return [id, PhyIDs].join(" ");
};

const getOptionLabelForId = (option) => {
	if (!option) return "";
	const { ActDate, Seq } = option;

	return `${ActDate}#${Seq}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.ActDate === value?.ActDate && option?.Seq === value?.Seq;
};

const getOptionKey = (option) => {
	return `${option?.ActDate || ""}#${option?.Seq || ""}`;
};

const AccountingEntries = {
	getOptionLabel,
	getOptionLabelForId,
	isOptionEqualToValue,
	getOptionKey,
};

export default AccountingEntries;
