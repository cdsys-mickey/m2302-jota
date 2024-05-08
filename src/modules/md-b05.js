/* eslint-disable no-mixed-spaces-and-tabs */
import Forms from "../shared-modules/sd-forms";

const transformForGridImport = (data) => {
	return (
		data?.map((v) => ({
			Pkey: v.Pkey,
			prod: {
				ProdID: v.ProdID,
				ProdData: v.ProdData_N,
			},
			// SProdID: v.ProdID,
			SProdData_N: v.ProdData_N,
			SPackData_N: v.PackData_N,
			SPrice: v.Price || null,
			Seq: v.Seq,
		})) || []
	);
};

const transformForGrid = (data) => {
	return (
		data?.map((v) => ({
			Pkey: v.Pkey,
			prod: {
				ProdID: v.SProdID,
				ProdData: v.SProdData_N,
			},
			// SProdID: v.SProdID,
			SProdData_N: v.SProdData_N,
			SPackData_N: v.SPackData_N,
			SPrice: v.SPrice || null,
			Seq: v.Seq,
		})) || []
	);
};

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
			supplier: FactID
				? {
						FactID,
						FactData: FactData_N,
				  }
				: null,
			quotes: transformForGrid(FactInq_S),
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
				// .filter((v) => v.prod?.ProdID)
				// .map((v, index) => ({
				// 	Pkey: v.Pkey?.length < 36 ? "" : v.Pkey,
				// 	SProdID: v.prod?.ProdID,
				// 	SPrice: v.SPrice,
				// 	// Seq: v.Seq,
				// 	Seq: index + 1,
				// })),
			}),
		},
		"InqDate"
	);
};

const transformAsQueryParams = (data) => {
	return {
		pi: data.sprod?.ProdID,
		pi2: data.eprod?.ProdID,
		pn: data.prodName,
		cl: data.catL?.LClas,
		cm: data.catM?.MClas,
		cs: data.catS?.SClas,
		ta: data.typeA?.TypeA,
	};
};

const B05 = {
	transformForReading,
	transformForSubmitting,
	transformAsQueryParams,
	transformForGridImport,
	transformForGrid,
};

export default B05;
