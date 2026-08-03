import DateFormats from "@/shared-modules/DateFormats.mjs";
import Forms from "@/shared-modules/Forms.mjs";

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
		reportType,
		...rest
	} = payload;
	return {
		JobName: "H21",
		Action: outputType?.id?.toString() || "",
		CutYM:
			Forms.formatDate(CutYM, DateFormats.DATEFNS_YEAR_AND_MONTH) || "",
		SProdID: SProdID?.ProdID || "",
		EProdID: EProdID?.ProdID || "",
		LClas: catL?.LClas || "",
		MClas: catM?.MClas || "",
		SClas: catS?.SClas || "",
		CaseID: counter?.CodeID || "",
		RptType: reportType?.id,
		...rest,
	};
};

const H21 = {
	transformForSubmitting,
};

export default H21;
