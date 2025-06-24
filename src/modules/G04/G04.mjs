import Forms from "@/shared-modules/Forms.mjs";

const Tabs = Object.freeze({
	CREATE: "CREATE",
	DELETE: "DELETE",
	RECOVER: "RECOVER",
});

const transformForSubmitting = (payload) => {
	const { AccYM, Stage, RecGroup, CutDate, CustID } = payload;
	return {
		AccYM: Forms.formatYearMonth(AccYM) ?? "",
		CutDate: Forms.formatDate(CutDate) ?? "",
		CustID: CustID?.CustID ?? "",
		Stage,
		RecGroup,
	};
};

const transformForDeleteSubmitting = (payload) => {
	const { delYM, delSession, delRecGroup, delCustID, Stage } = payload;
	return {
		AccYM: Forms.formatYearMonth(delYM) ?? "",
		Stage:
			Stage ||
			(delSession?.Stage != null ? delSession.Stage : delSession || ""),
		RecGroup: delRecGroup ?? "",
		CustID: delCustID?.CustID ?? "",
		CutDate: "",
		CustData_N: "",
	};
};

const transformForRecoverSubmitting = (payload) => {
	const { recYM, recSession, recStage } = payload;
	return {
		AccYM: Forms.formatYearMonth(recYM) ?? "",
		Stage: recStage ?? (recSession?.Stage != null ? recSession.Stage : ""),
	};
};

const G04 = {
	Tabs,
	transformForSubmitting,
	transformForDeleteSubmitting,
	transformForRecoverSubmitting,
};

export default G04;
