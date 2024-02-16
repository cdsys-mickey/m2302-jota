/* eslint-disable no-mixed-spaces-and-tabs */
const FUNCTIONS = [
	"INQ",
	"INS",
	"UPD",
	"PRT",
	"DEL",
	"USI",
	"CHK",
	"NCK",
	"RUN",
	"EXP",
	"IMP",
];
const getOptionKey = (option) => {
	return option["JobID"];
};

const getOptionLabel = (option) => {
	if (!option) return "";
	const { JobID, JobName } = option;
	return `${JobID} ${JobName}`;
	// return `${JobID}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.JobID === value?.JobID;
};

const renderTagLabel = (option) => {
	if (!option) return "";
	const { JobID, JobName } = option;
	// return `${JobID} ${JobName}`;
	return `${JobID}`;
};

const transformForGridEdior = (payload) => {
	return payload.map((i) => {
		const { JobID, JobName, ...rest } = i;
		return {
			// module: JobID
			// 	? {
			// 			JobID: JobID,
			// 			JobName: JobName,
			// 	  }
			// 	: null,
			JobID,
			JobName,
			...rest,
		};
	});
};

const transformForSubmit = (data) => {
	return data.map((i) => {
		const { module, ...rest } = i;
		return {
			JobID: module?.JobID || "",
			...rest,
		};
	});
};

const transformForReading = (data) => {
	const { JobID, JobName_N, ...rest } = data;

	return {
		module: JobID
			? {
					JobID,
					JobName: JobName_N,
			  }
			: null,
		JobID,
		JobName: JobName_N,
		...rest,
	};
};

const transformModulesToIds = (modules) => {
	return modules.map((m) => m.JobID);
};

const ZA03 = {
	transformForGridEdior,
	transformForSubmit,
	transformForReading,
	transformModulesToIds,
	// PICKER
	getOptionKey,
	getOptionLabel,
	isOptionEqualToValue,
	renderTagLabel,
	FUNCTIONS,
};

export default ZA03;
