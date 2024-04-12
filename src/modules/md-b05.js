import Forms from "../shared-modules/sd-forms";

const transformForReading = (payload) => {
	const {
		EmplID,
		EmplData_N,
		FactID,
		FactData_N,
		FactInq_S,
		Remark,
		...rest
	} = payload;

	return Forms.processDateFieldsForReset(
		{
			employee: {
				CodeID: EmplID,
				CodeData: EmplData_N,
			},
			supplier: {
				FactID,
				FactData: FactData_N,
			},
			...(FactInq_S && {
				quotes: FactInq_S.map((v) => ({
					Pkey: v.Pkey,
					prod: {
						ProdID: v.SProdID,
						ProdData: v.SProdData_N,
					},
					SProdID: v.SProdID,
					SProdData_N: v.SProdData_N,
					SPackData_N: v.SPackData_N,
					SPrice: v.SPrice,
					Seq: v.Seq,
				})),
			}),
			remark: Remark.join("\n"),
			...rest,
		},
		"InqDate"
	);
};

const transformForSubmitting = (payload, quoteGridData) => {
	const { InqID, InqDate, employee, supplier, remark } = payload;
	return Forms.processDateFieldsForSubmit(
		{
			InqID,
			InqDate,
			EmplID: employee?.CodeID || "",
			FactID: supplier?.FactID || "",
			Remark: remark?.split("\n") || [],
			...(quoteGridData && {
				FactInq_S: quoteGridData
					.filter((v) => v.prod?.ProdID)
					.map((v, index) => ({
						Pkey: v.Pkey?.length < 36 ? "" : v.Pkey,
						SProdID: v.prod?.ProdID,
						SPrice: v.SPrice,
						// Seq: v.Seq,
						Seq: index + 1,
					})),
			}),
		},
		"InqDate"
	);
};

const B05 = {
	transformForReading,
	transformForSubmitting,
};

export default B05;
