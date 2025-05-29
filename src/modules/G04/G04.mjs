import Forms from "@/shared-modules/Forms.mjs";

const Tabs = Object.freeze({
	CREATE: "CREATE",
	DELETE: "DELETE",
});

const transformForSubmitting = (payload) => {
	const { AccYM, CutDate, CustID, ...rest } = payload;
	return {
		AccYM: Forms.formatYearMonth(AccYM) ?? "",
		CutDate: Forms.formatDate(CutDate) ?? "",
		...(CustID && {
			CustID: CustID.CustID,
		}),
		...rest,
	};
};

const transformForDeleteSubmitting = (payload) => {
	const { delYM, delSession, delRecGroup, delCustID } = payload;
	return {
		AccYM: Forms.formatYearMonth(delYM) ?? "",
		Stage: delSession?.Stage != null ? delSession.Stage : delSession || "",
		RecGroup: delRecGroup ?? "",
		CustID: delCustID?.CustID ?? "",
		CutDate: "",
		CustData_N: "",
	};
};

const G04 = {
	transformForSubmitting,
	transformForDeleteSubmitting,
	Tabs,
};

export default G04;
