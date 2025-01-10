const getOptionLabel = (option) => {
	if (!option) return "";
	const { JobID, JobName } = option;
	return [JobID, JobName].filter(Boolean).join(" ");
};

const getOptionLabelForId = (option) => {
	if (!option) return "";
	const { JobID } = option;
	return `${JobID}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.JobID === value?.JobID;
};

const getOptionKey = (option) => {
	return option?.JobID;
};

const Jobs = {
	getOptionLabel,
	getOptionLabelForId,
	isOptionEqualToValue,
	getOptionKey,
};

export default Jobs;
