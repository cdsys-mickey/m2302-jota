import Forms from "@/shared-modules/sd-forms";

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