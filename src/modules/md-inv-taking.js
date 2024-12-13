const getOptionLabel = (option) => {
	if (!option) return "";
	const { PhyID, PhyData } = option;
	return [PhyID, PhyData || ""].filter(Boolean).join(" ");
};

const getOptionLabelForId = (option) => {
	if (!option) return "";
	const { PhyID } = option;

	return `${PhyID}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.PhyID === value?.PhyID;
};

const getOptionKey = (option) => {
	return option?.PhyID;
};

const InvTaking = {
	getOptionLabel,
	getOptionLabelForId,
	isOptionEqualToValue,
	getOptionKey,
};

export default InvTaking;
