/* eslint-disable no-mixed-spaces-and-tabs */

const Tabs = Object.freeze({
	INFO: "INFO",
	AUTH: "AUTH",
});

const getOptionLabel = (option) => {
	if (!option) return "";
	const { DeptID, AbbrName } = option;
	return `${DeptID} ${AbbrName}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.DeptID === value?.DeptID;
};

const transformForReading = (payload) => {
	const { DeptID, Dept_N, ...rest } = payload;
	return {
		...rest,
		dept: {
			DeptID,
			AbbrName: Dept_N,
		},
	};
};

const transformForEditorSubmit = (payload) => {
	const { dept, ...rest } = payload;
	return {
		...rest,
		DeptID: dept?.DeptID || "",
	};
};

// 目前尚未使用
const paramsToJsonData = (params) => {
	const where = [];

	return {
		StdWhere: where,
		...(params?.qs && {
			CondData: {
				QS_ID: `${params.qs}%`,
				QS_NAME: `%${params.qs}%`,
			},
		}),
	};
};

const Users = {
	transformForReading,
	transformForEditorSubmit,
	paramsToJsonData,
	getOptionLabel,
	isOptionEqualToValue,
	Tabs,
};

export default Users;
