import DateFormats from "@/shared-modules/sd-date-formats";
import Forms from "@/shared-modules/Forms.mjs";

const Tabs = Object.freeze({
	CREATE: "CREATE",
	DELETE: "DELETE",
});

const transformForSubmitting = (payload) => {
	const {
		outputType,
		CutYM,
		SProdID,
		EProdID,
		catL,
		catM,
		catS,
		counter,
		...rest
	} = payload;
	return {
		JobName: "G04",
		Action: outputType?.id?.toString() || "",
		CutYM:
			Forms.formatDate(CutYM, DateFormats.DATEFNS_YEAR_AND_MONTH) || "",
		SProdID: SProdID?.ProdID || "",
		EProdID: EProdID?.ProdID || "",
		LClas: catL?.LClas || "",
		MClas: catM?.MClas || "",
		SClas: catS?.SClas || "",
		CaseID: counter?.CodeID || "",
		...rest,
	};
};

const G04 = {
	transformForSubmitting,
	Tabs,
};

export default G04;
