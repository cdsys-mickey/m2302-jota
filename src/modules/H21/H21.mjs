import DateFormats from "@/shared-modules/sd-date-formats";
import Forms from "@/shared-modules/sd-forms";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SDate,
		EDate,
		SProdID,
		EProdID,
		catL,
		catM,
		catS,
		counter,
		...rest
	} = payload;
	return {
		JobName: "H21",
		Action: outputType?.id?.toString() || "",
		SDate:
			Forms.formatDate(SDate, DateFormats.DATEFNS_YEAR_AND_MONTH) || "",
		EDate:
			Forms.formatDate(EDate, DateFormats.DATEFNS_YEAR_AND_MONTH) || "",
		SProdID: SProdID?.ProdID || "",
		EProdID: EProdID?.ProdID || "",
		LClas: catL?.LClas || "",
		MClas: catM?.MClas || "",
		SClas: catS?.SClas || "",
		CaseID: counter?.CodeID || "",
		...rest,
	};
};

const H21 = {
	transformForSubmitting,
};

export default H21;
