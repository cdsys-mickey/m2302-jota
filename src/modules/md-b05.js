/* eslint-disable no-mixed-spaces-and-tabs */
import { nanoid } from "nanoid";
import Forms from "../shared-modules/sd-forms";

const transformForGridImport = (data) => {
	return (
		data?.map((v) => ({
			Pkey: nanoid(),
			prod: {
				ProdID: v.SProdID,
				ProdData: v.SProdData_N,
			},
			SProdData_N: v.SProdData_N,
			SPackData_N: v.SPackData_N,
			SPrice: v.SPrice || null,
			Seq: v.Seq,
		})) || []
	);
};

const transformGridForReading = (data) => {
	return (
		data?.map((v) => ({
			Pkey: v.Pkey,
			prod: {
				ProdID: v.SProdID,
				ProdData: v.SProdData_N,
			},
			SProdData_N: v.SProdData_N,
			SPackData_N: v.SPackData_N,
			SPrice: v.SPrice,
			Seq: v.Seq,
		})) || []
	);
};

const transformGridForSubmitting = (data) => {
	return data
		.filter((v) => v.prod?.ProdID)
		.map((v, index) => ({
			Pkey: v.Pkey?.length < 36 ? "" : v.Pkey,
			SProdID: v.prod?.ProdID,
			SPrice: v.SPrice?.toString() || "",
			Seq: index + 1,
		}));
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
			quotes: transformGridForReading(FactInq_S),
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
				FactInq_S: transformGridForSubmitting(quoteGridData),
			}),
		},
		"InqDate"
	);
};

const transformImportProdsAsQueryParams = (data) => {
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

const transformAsQueryParams = (data) => {
	return {
		emp: data.lvEmployee?.CodeID,
		dat: Forms.formatDate(data.lvDate),
		sup: data.lvSupplier?.FactID,
	};
};

const B05 = {
	transformForReading,
	transformForSubmitting,
	transformImportProdsAsQueryParams,
	transformForGridImport,
	transformGridForReading,
	transformAsQueryParams,
};

export default B05;
