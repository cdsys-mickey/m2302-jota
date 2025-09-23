/* eslint-disable no-mixed-spaces-and-tabs */

import Auth from "./Auth.mjs";

const getOptionLabel = (option) => {
	if (!option) return "";
	const { UserName, AbbrName } = option;
	return `${UserName} ${AbbrName || "(未知)"}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.UID === value?.UID;
};

const transformForReading = (payload) => {
	const { data, depts } = payload;
	const { DeptID, Dept_N, Class, ...rest } = data[0] || {};
	return {
		...rest,
		dept: {
			DeptID,
			AbbrName: Dept_N,
		},
		userClass: Auth.findById(Class),
		depts,
	};
};

const transformForEditorSubmit = (data) => {
	const { dept, userClass, depts, ...rest } = data;
	return {
		data: {
			...rest,
			DeptID: dept?.DeptID || "",
			Class: userClass?.id || Auth.SCOPES.DEPT,
		},
		depts,
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

const UserInfo = {
	transformForReading,
	transformForEditorSubmit,
	paramsToJsonData,
	getOptionLabel,
	isOptionEqualToValue,
};

export default UserInfo;
