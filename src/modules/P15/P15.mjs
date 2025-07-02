import Forms from "@/shared-modules/Forms.mjs";
import DateFormats from "@/shared-modules/DateFormats.mjs";

const transformForSubmitting = (payload) => {
	const { outputType, SDate, EDate, STime, ETime, ...rest } = payload;
	return {
		JobName: "P15",
		Action: outputType?.id?.toString() || "",
		SDate: Forms.formatDate(SDate) || "",
		EDate: Forms.formatDate(EDate) || "",
		STime: Forms.formatDate(STime, DateFormats.DATEFNS_HOUR) || "",
		ETime: Forms.formatDate(ETime, DateFormats.DATEFNS_HOUR) || "",
		...rest,
	};
};

const P15 = {
	transformForSubmitting,
};

export default P15;
