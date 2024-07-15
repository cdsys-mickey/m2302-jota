/* eslint-disable no-mixed-spaces-and-tabs */
const AUTH_EDITING_MODE = Object.freeze({
	CLICK: "CLICK",
	SUBMIT: "SUBMIT",
});

const getOptionKey = (option) => {
	return option["JobID"];
};

const getOptionLabel = (option) => {
	if (!option) return "";
	const { JobID, JobName } = option;
	return `${JobID}\t${JobName}`;
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

const transformForSubmit = (data) => {
	return data.map((i) => {
		const {
			INQ,
			INS,
			UPD,
			PRT,
			DEL,
			USI,
			CHK,
			NCK,
			RUN,
			EXP,
			IMP,
			...rest
		} = i;
		return {
			INQ: INQ ? "1" : "0",
			INS: INS ? "1" : "0",
			UPD: UPD ? "1" : "0",
			DEL: DEL ? "1" : "0",
			PRT: PRT ? "1" : "0",
			USI: USI ? "1" : "0",
			CHK: CHK ? "1" : "0",
			NCK: NCK ? "1" : "0",
			RUN: RUN ? "1" : "0",
			EXP: EXP ? "1" : "0",
			IMP: IMP ? "1" : "0",
			...rest,
		};
	});
};

const transformForReading = (data) => {
	// const { JobID, JobName_N,  ...rest } = data;
	const { INQ, INS, UPD, PRT, DEL, USI, CHK, NCK, RUN, EXP, IMP, ...rest } =
		data;

	return {
		enabled: true,
		INQ: INQ === "1",
		INS: INS === "1",
		UPD: UPD === "1",
		DEL: DEL === "1",
		PRT: PRT === "1",
		USI: USI === "1",
		CHK: CHK === "1",
		NCK: NCK === "1",
		RUN: RUN === "1",
		EXP: EXP === "1",
		IMP: IMP === "1",
		Using: "1",
		...rest,
	};
};

const transformModulesToIds = (modules) => {
	return modules.map((m) => m.JobID);
};

const UserAuth = {
	AUTH_EDITING_MODE,
	// transformForGridEdior,
	transformForSubmit,
	transformForReading,
	transformModulesToIds,
	// PICKER
	getOptionKey,
	getOptionLabel,
	isOptionEqualToValue,
	renderTagLabel,
};

export default UserAuth;
