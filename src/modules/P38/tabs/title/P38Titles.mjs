import CmsCalcTypes from "@/components/CmsCalcTypePicker/CmsCalTypes.mjs";

const transformForReading = (payload) => {
	const { Head, Tail, CmsCalc, ...rest } = payload || {};

	return {
		Head: Head ?? "",
		Tail: Tail.join("\n"),
		CmsCalc: CmsCalcTypes.getOptionById(CmsCalc),
		...rest,
	};
};

const transformForEditorSubmit = (payload) => {
	const { Head, Tail, CmsCalc, ...rest } = payload;

	// console.log("ignore props", commissions);

	return {
		Head: Head ?? "",
		Tail: Tail.split("\n"),
		CmsCalc: CmsCalc?.id ?? "",
		...rest,
	};
};

const P38Titles = {
	transformForReading,
	transformForEditorSubmit,
};

export default P38Titles;
