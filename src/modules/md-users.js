/* eslint-disable no-mixed-spaces-and-tabs */

import Auth from "./md-auth";

const AUTH_EDITING_MODE = Object.freeze({
	CLICK: "CLICK",
	SUBMIT: "SUBMIT",
});

const Tabs = Object.freeze({
	INFO: "INFO",
	AUTH: "AUTH",
	AUTH2: "AUTH2",
});

const getOptionLabel = (option) => {
	if (!option) return "";
	const { DeptID, AbbrName } = option;
	return `${DeptID} ${AbbrName || "(未知)"}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.DeptID === value?.DeptID;
};

const transformForReading = (payload) => {
	const { DeptID, Dept_N, Class, ...rest } = payload;
	return {
		...rest,
		dept: {
			DeptID,
			AbbrName: Dept_N,
		},
		userClass: Auth.getById(Class),
	};
};

const transformForEditorSubmit = (payload) => {
	const { dept, userClass, ...rest } = payload;
	return {
		...rest,
		DeptID: dept?.DeptID || "",
		Class: userClass?.id || Auth.SCOPES.DEPT,
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
	AUTH_EDITING_MODE,
};

export default Users;
