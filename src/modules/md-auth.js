import Colors from "./md-colors";

const COOKIE_MODE = "md";
const COOKIE_ACCOUNT = "ac";
const COOKIE_LOGKEY = "LogKey";
const COOKIE_REMEMBER_ME = "rememberMe";

const SCOPES = Object.freeze({
	DEPT: 0,
	BRANCH_HQ: 1,
	HQ: 2,
	ROOT: 3,
});

const COOKIE_OPTS = {
	path: "/",
	expires: 365,
};

const AUTH_SCOPE_OPTIONS = [
	{
		id: SCOPES.DEPT,
		label: "門市",
	},
	{
		id: SCOPES.BRANCH_HQ,
		label: "分公司",
	},
	{
		id: SCOPES.HQ,
		label: "總公司",
	},
	{
		id: SCOPES.ROOT,
		label: "系統",
	},
];

const getOptionLabel = (option) => {
	if (!option) return "";
	const { label } = option;
	return `${label}`;
};

const isOptionEqualToValue = (option, value) => option["id"] === value["id"];

const getOptionKey = (option) => {
	return option?.id;
};

const getById = (id) => {
	return AUTH_SCOPE_OPTIONS.find((o) => o.id === id);
};

const FUNCTIONS = Object.freeze({
	INQ: "查詢",
	INS: "新增",
	UPD: "修改",
	PRT: "列印",
	DEL: "刪除",
	USI: "停用",
	CHK: "審核",
	NCK: "取消審核",
	RUN: "執行",
	EXP: "匯出",
	IMP: "匯入",
});

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
	canPatch: payload["USI"] === "1",
	canReview: payload["CHK"] === "1",
	canReject: payload["NCK"] === "1",
	canRun: payload["RUN"] === "1",
	canExport: payload["EXP"] === "1",
	canImport: payload["IMP"] === "1",
});

const getHeaderColor = (userClass) => {
	switch (userClass) {
		case Auth.SCOPES.ROOT:
			return Colors.SCOPE_ROOT;
		case Auth.SCOPES.HQ:
			return Colors.SCOPE_HQ;
		case Auth.SCOPES.BRANCH_HQ:
			return Colors.SCOPE_BRANCH_HQ;
		case Auth.SCOPES.DEPT:
		default:
			return Colors.SCOPE_DEPT;
	}
};

const Auth = {
	getItemById,
	COOKIE_MODE,
	COOKIE_ACCOUNT,
	COOKIE_LOGKEY,
	COOKIE_REMEMBER_ME,
	FUNCTIONS,
	...FUNCTIONS,
	transformPayloadToAuthority,
	SCOPES,
	AUTH_SCOPE_OPTIONS,
	getOptionLabel,
	isOptionEqualToValue,
	getOptionKey,
	COOKIE_OPTS,
	getById,
	getHeaderColor,
};

export default Auth;
