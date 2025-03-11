/* eslint-disable no-mixed-spaces-and-tabs */
import { nanoid } from "nanoid";
import Forms from "../shared-modules/Forms.mjs";

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
			SPrice: v.SPrice || null,
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

const OrderBy = Object.freeze({
	SUPPLIER: 1,
	PROD: 2,
});

const transformAsQueryParams = (data) => {
	return {
		emp: data.emp?.EmplID,
		emp2: data.emp2?.EmplID,
		cst: data.customer?.CustID,
		cst2: data.customer2?.CustID,
		prd: data.prod?.ProdID,
		prd2: data.prod2?.ProdID,
		dat: Forms.formatDate(data.date),
		dat2: Forms.formatDate(data.date2),
		sort: data.orderBy?.id || OrderBy.SUPPLIER,
	};
};

const options = [
	{ id: OrderBy.SUPPLIER, name: "客戶" },
	{ id: OrderBy.PROD, name: "商品" },
];

const getOptionLabel = (option) => {
	if (!option) return "";
	const { id, name } = option;
	return `${id} ${name}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.id === value?.id;
};

const findById = (id) => {
	return options.find((o) => String(o.id) === String(id));
};

const B02 = {
	transformForReading,
	transformForSubmitting,
	transformAsQueryParams,
	transformForGridImport,
	transformGridForReading,
	// 排序
	OrderBy,
	options,
	getOptionLabel,
	isOptionEqualToValue,
	findById,
};

export default B02;
