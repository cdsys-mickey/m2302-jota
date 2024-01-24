const COOKIE_MODE = "md";
const COOKIE_ACCOUNT = "ac";
const COOKIE_LOGKEY = "LogKey";
const COOKIE_REMEMBER_ME = "rememberMe";

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

const Auth = {
	getItemById,
	COOKIE_MODE,
	COOKIE_ACCOUNT,
	COOKIE_LOGKEY,
	COOKIE_REMEMBER_ME,
	FUNCTIONS,
	...FUNCTIONS,
	transformPayloadToAuthority,
};

export default Auth;
