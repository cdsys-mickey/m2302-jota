import Forms from "@/shared-modules/Forms.mjs";

const transformForSubmitting = (payload) => {
	const {
		outputType,
		SDate,
		EDate,
		SComID,
		EComID,
		TrvID,
		CarID,
		CndID,
		CmsAmt,
		CmsType,
		reportType,
		reportStyle,
		Sign,
		...rest
	} = payload;
	return {
		JobName: "P52",
		Action: outputType?.id?.toString() ?? "",
		SDate: Forms.formatDate(SDate) ?? "",
		EDate: Forms.formatDate(EDate) ?? "",
		SComID: SComID?.ComID ?? "",
		EComID: EComID?.ComID ?? "",
		TrvID: TrvID?.TrvID ?? "",
		CarID: CarID?.CarID ?? "",
		CndID: CndID?.CndID ?? "",
		CmsAmt: CmsAmt?.toString() ?? "",
		CmsType: CmsType?.id ?? "",
		RptType: reportType?.id,
		StyType: reportStyle?.id,
		Sign: Sign ? "Y" : "N",
		...rest,
	};
};

const P52 = {
	transformForSubmitting,
};

export default P52;
