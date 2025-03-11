import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const { SPosNo, SDate, EDate } = payload;

	return {
		sdate: Forms.formatDate(SDate),
		edate: Forms.formatDate(EDate),
		posno: SPosNo?.PosNo || "",
	};
};

const P04 = {
	transformForSubmitting,
};

export default P04;
