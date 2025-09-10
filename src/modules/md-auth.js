import Colors from "./Colors.mjs";

const COOKIE_LANDING = "landing";
const COOKIE_LOGIN = "login";
const COOKIE_MODE = "md";
const COOKIE_ACCOUNT = "ac";
// const COOKIE_LOGKEY = "m2302-token";
const COOKIE_LOGKEY = "LogKey";
const COOKIE_REMEMBER_ME = "rememberMe";
const MAGIC_PREFIX = "~~";

const SCOPES = Object.freeze({
	DEPT: 0,
	BRANCH_HQ: 1,
	HQ: 2,
	SYS: 3,
	ROOT: 4,
});

const SCOPE_LABELS = Object.freeze({
	[SCOPES.DEPT]: "門市",
	[SCOPES.BRANCH_HQ]: "分公司",
	[SCOPES.HQ]: "總公司",
	[SCOPES.SYS]: "系統",
	[SCOPES.ROOT]: "超級",
});

const COOKIE_OPTS = {
	path: "/",
	expires: 365,
};

const LOCAL_COOKIE_OPTS = {
	path: `${import.meta.env.VITE_PUBLIC_URL || "/"}`,
	expires: 365,
};

const AUTH_SCOPE_OPTIONS = Object.keys(SCOPE_LABELS).map((key) => ({
	id: parseInt(key),
	label: SCOPE_LABELS[key],
}));

const getOptionLabel = (option) => {
	if (!option) return "";
	const { label } = option;
	return `${label}`;
};

const isOptionEqualToValue = (option, value) => option["id"] === value["id"];

const getOptionKey = (option) => {
	return option?.id;
};

const findById = (id) => {
	return AUTH_SCOPE_OPTIONS.find((o) => o.id === id);
};

const FUNCTIONS = Object.freeze({
	// INQ: "查詢",
	INS: "新增",
	UPD: "修改",
	PRT: "列印",
	DEL: "刪除",
	USI: "進階",
	CHK: "覆核",
	NCK: "解除",
	// RUN: "執行",
	// EXP: "匯出",
	// IMP: "匯入",
});

const FUNCTION_START_INDEX = 3;
const CHECKBOX_INDEXES = [
	0,
	...Object.keys(FUNCTIONS).map((_, i) => i + FUNCTION_START_INDEX),
];

const getItemById = (data, id) => {
	let targetItem = null;
	for (const moduleKey in data) {
		const module = data[moduleKey];
		const items = module.items;
		const foundItem = items.find((item) => item.id === id);

		if (foundItem) {
			targetItem = foundItem;
			break;
		}
	}
	return targetItem;
};

const transformPayloadToAuthority = (payload) => ({
	canRead: payload["INQ"] === "1",
	canCreate: payload["INS"] === "1",
	canUpdate: payload["UPD"] === "1",
	canDelete: payload["DEL"] === "1",
	canPrint: payload["PRT"] === "1",
	canManage: payload["USI"] === "1",
	canReview: payload["CHK"] === "1",
	canReject: payload["NCK"] === "1",
	canRun: payload["RUN"] === "1",
	canExport: payload["EXP"] === "1",
	canImport: payload["IMP"] === "1",
});

const getHeaderColor = (userClass) => {
	switch (parseInt(userClass)) {
		case Auth.SCOPES.ROOT:
			return Colors.SCOPE_ROOT;
		case Auth.SCOPES.SYS:
			return Colors.SCOPE_SYS;
		case Auth.SCOPES.HQ:
			return Colors.SCOPE_HQ;
		case Auth.SCOPES.BRANCH_HQ:
			return Colors.SCOPE_BRANCH_HQ;
		case Auth.SCOPES.DEPT:
		default:
			return Colors.SCOPE_DEPT;
	}
};

const isCheckboxColumn = ({ col, row }) => {
	return CHECKBOX_INDEXES.includes(col);
};

const getFunctionKeyByIndex = (index) => {
	const keys = Object.keys(FUNCTIONS);
	return index >= FUNCTION_START_INDEX
		? keys[index - FUNCTION_START_INDEX]
		: undefined;
};

const Auth = {
	getItemById,
	COOKIE_LANDING,
	COOKIE_LOGIN,
	COOKIE_MODE,
	COOKIE_ACCOUNT,
	COOKIE_LOGKEY,
	COOKIE_REMEMBER_ME,
	FUNCTIONS,
	...FUNCTIONS,
	transformPayloadToAuthority,
	SCOPES,
	SCOPE_LABELS,
	AUTH_SCOPE_OPTIONS,
	getOptionLabel,
	isOptionEqualToValue,
	getOptionKey,
	COOKIE_OPTS,
	LOCAL_COOKIE_OPTS,
	findById,
	getHeaderColor,
	isCheckboxColumn,
	getFunctionKeyByIndex,
	MAGIC_PREFIX,
};

export default Auth;
